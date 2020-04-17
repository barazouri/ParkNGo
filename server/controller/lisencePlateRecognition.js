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
          const userFound = await Profiles.findOne({
            driverLicensePlate: parkingSpot.parkingSpots[0].availability
          })
         await Profiles.updateOne(
            { profileId: profileId, 'parkingSpots.parkingId': parkingId },
            {
              $pull: {'parkingSpots.$.futureReservations': {'bookedBy': userFound.email}}
            }
          )
          let pastReservation = {bookedBy: userFound.email, untilDate: Date.now()}
          await Profiles.findOneAndUpdate(
            { profileId: profileId, 'parkingSpots.parkingId': parkingId },
            {
              $push: {'parkingSpots.$.pastReservations': pastReservation}
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
          const userFound = await Profiles.findOne({
            driverLicensePlate: plateNumber
          })
          console.log(userFound.email)
        }
        await Profiles.updateOne(
          { profileId: profileId, 'parkingSpots.parkingId': parkingId },
          { $set: { 'parkingSpots.$.availability': plateNumber } }
        )
        console.log(profileId)
        console.log(parkingId)

        // let test = await Profiles.updateOne(
        //   { profileId: profileId, 'parkingSpots.parkingId': parkingId}
        //   ,{ 'futureReservations.bookedBy': userFound.email},
        //   {
        //     $set: {'parkingSpots.$[futureReservations].enteredTime': Date.now()}
        //   }
        // )
        // console.log(test)
        // let test = await Profiles.updateOne(
        //     {"parkingSpots.parkingId": parkingId, "parkingSpots.futureReservations.bookedBy": userFound.email},
        //     { $set: {'parkingSpots.$.futureReservations.requireToDate': Date.now() } }
        // )
        // console.log(test)
      }
      return res.json(plateNumber)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  }
}
