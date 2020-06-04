const Profiles = require('../models/profiles')

module.exports = {
  async licensePlateUpdate (req, res) {
    try {
      let { plateNumber = null, profileId = null, parkingId = null } = req.body
      const userFound = await Profiles.find({ profileId: profileId })
      if (!userFound.length) {
        console.log("A profile with that gmail account isn't exist")
        return res.json("A profile with that gmail account isn't exist")
      } else {
        let reservation
        let exitDate = Date.now()
        if (plateNumber.length == 0) {
          // add date to this queryti find the specific park on a specific date
          await Profiles.updateOne(
            {
              profileId: profileId,
              'driverOrderSpot.parkingSpotID': parkingId
            },
            { $set: { 'driverOrderSpot.$.exitTime': exitDate } }
          )
          const parkingSpot = await Profiles.findOne(
            { profileId: profileId },
            { parkingSpots: { $elemMatch: { parkingId: parkingId } } }
          )
          console.log(parkingSpot.parkingSpots[0].availability)
          if (parkingSpot.parkingSpots[0].availability == '')
            throw new Error('there is no car into the parking spot')
          const userFoundExit = await Profiles.findOne({
            driverLicensePlate: parkingSpot.parkingSpots[0].availability
          })
          let parkingSpotResult = await Profiles.findOne(
            {
              profileId: profileId
            },
            { parkingSpots: { $elemMatch: { parkingId: parkingId } } }
          )
          parkingSpotResult.parkingSpots[0].futureReservations.map(
            futureReservation => {
              if (futureReservation.bookedBy === userFoundExit.email) {
                reservation = futureReservation
                console.log(reservation)
              }
            }
          )
          await Profiles.updateOne(
            { profileId: profileId, 'parkingSpots.parkingId': parkingId },
            {
              $pull: {
                'parkingSpots.$.futureReservations': {
                  bookedBy: userFoundExit.email
                }
              }
            }
          )
          let pastReservation = {
            bookedBy: userFoundExit.email,
            untilDate: Date.now(),
            fromoDate: reservation.enteredTime
          }
          await Profiles.updateOne(
            { profileId: profileId, 'parkingSpots.parkingId': parkingId },
            {
              $push: { 'parkingSpots.$.pastReservations': pastReservation }
            }
          )
        } else {
          // Need to add validation function to check if this numberPlate exist in the system
          await Profiles.updateOne(
            {
              driverLicensePlate: plateNumber,
              'driverOrderSpot.parkingSpotID': parkingId
            },
            { $set: { 'driverOrderSpot.$.enteredTime': Date.now() } }
          )
          const userFoundEntered = await Profiles.findOne({
            driverLicensePlate: plateNumber
          })
          console.log(userFoundEntered.email)
          let parkingSpotResult = await Profiles.findOne(
            {
              profileId: profileId
            },
            { parkingSpots: { $elemMatch: { parkingId: parkingId } } }
          )
          parkingSpotResult.parkingSpots[0].futureReservations.map(
            futureReservation => {
              if (futureReservation.bookedBy === userFoundEntered.email) {
                futureReservation.enteredTime = new Date(Date.now())
              }
            }
          )

          parkingSpotResult.save()
        }
        await Profiles.updateOne(
          { profileId: profileId, 'parkingSpots.parkingId': parkingId },
          { $set: { 'parkingSpots.$.availability': plateNumber } }
        )
      }
      res.io.emit("parkingSpotAvailabilityChange",  plateNumber)
      return res.json(plateNumber)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  }
}
