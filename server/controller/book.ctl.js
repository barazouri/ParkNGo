const Profiles = require('../models/profiles')

module.exports = {
  /**Get without params */

  /***
   *
   *
   *
   *
   *
   */
  /**Get with params */
  async getFutureReservationsForHost (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      const allFutureReservations = []
      result.map(parkingSpot => {
        parkingSpot.parkingSpots.map(futureReservation => {
          allFutureReservations.push(futureReservation.futureReservations)
        })
      })
      console.log(allFutureReservations)
      res.json(allFutureReservations)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async getFutureReservationsForDriver (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      let allFutureReservations = []
      await result.map(profile => {
        allFutureReservations = profile.driverOrderSpot.map(async order => {
          const resultsParkingspot = await Profiles.find(
            { 'parkingSpots.parkingId': order.parkingSpotID },
            {
              parkingSpots: {
                $elemMatch: { parkingId: order.parkingSpotID }
              }
            }
          )
          return {
            parkingSpotID: order.parkingSpotID,
            address: resultsParkingspot[0].parkingSpots[0].address,
            requireToDate: order.requireToDate,
            requireUntilDate: order.requireUntilDate,
            policy: resultsParkingspot[0].parkingSpots[0].policy,
            parkingSize: resultsParkingspot[0].parkingSpots[0].parkingSize,
            price: resultsParkingspot[0].parkingSpots[0].price,
            directions: resultsParkingspot[0].parkingSpots[0].directions,
            availability: resultsParkingspot[0].parkingSpots[0].availability,
            totalRankParking: resultsParkingspot[0].parkingSpots[0].totalRankParking,
            parkingPictures: resultsParkingspot[0].parkingSpots[0].parkingPictures
          }
        })
      })
      const resultsallFutureReservations = await Promise.all(
        allFutureReservations
      )
      console.log(resultsallFutureReservations)
      res.json(resultsallFutureReservations)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async getHostWaitingQueue (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      const allHostWaitingQueue = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          parkingSpot.hostWaitingQueue.map(waitingQueue => {
            allHostWaitingQueue.push(waitingQueue)
          })
        })
      })
      console.log(allHostWaitingQueue)
      res.json(allHostWaitingQueue)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async getDriverWaitingQueue (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      const allDriverWaitingQueue = []
      result.map(profile => {
        profile.driverWaitingQueue.map(waitingQueue => {
          allDriverWaitingQueue.push(waitingQueue)
        })
      })
      console.log(allDriverWaitingQueue)
      res.json(allDriverWaitingQueue)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async getHostDeclineReservations (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      const allDeclineReservations = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          parkingSpot.hostDeclineReservations.map(decline => {
            allDeclineReservations.push(decline)
          })
        })
      })
      console.log(allDeclineReservations)
      res.json(allDeclineReservations)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async getDriverDeclineReservations (req, res, next) {
    try {
      const { email = null } = req.query
      const result = await Profiles.find({ email: email })
      const allDeclineReservations = []
      result.map(profile => {
        profile.driverDeclineReservations.map(decline => {
          allDeclineReservations.push(decline)
        })
      })
      console.log(allDeclineReservations)
      res.json(allDeclineReservations)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  /***
   *
   *
   *
   *
   *
   */
  /**Post */
  async bookParkingSpot (req, res, next) {
    try {
      const {
        email = null,
        parkingSpotID = null,
        requireToDate = null,
        requireUntilDate = null,
        isAutomatic = true
      } = req.body

      const driverProfile = await Profiles.find({ email: email })
      const parkingId = parkingSpotID
      const parkingSpotProfile = await Profiles.find({
        parkingSpots: { $elemMatch: { parkingId } }
      })

      let fromTimeDate = new Date(requireToDate)
      let untilTimeDate = new Date(requireUntilDate)
      if (isAutomatic === true || isAutomatic === 'true') {
        let driverOrderSpot = {
          parkingSpotID: parkingSpotID,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        if (!driverProfile.length || !parkingSpotProfile.length) {
          console.log(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
          return res.json(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
        }
        const futureReservations = {
          parkingId: parkingSpotID,
          bookedBy: email,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        await Profiles.updateOne(
          { email: email },
          { $push: { driverOrderSpot: driverOrderSpot } }
        )

        await Profiles.updateOne(
          { 'parkingSpots.parkingId': parkingSpotID },
          { $push: { 'parkingSpots.$.futureReservations': futureReservations } }
        )

        console.log('ok')
        res.json('ok')
      } else {
        let driverWaitingQueue = {
          parkingId: parkingSpotID,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        if (!driverProfile.length || !parkingSpotProfile.length) {
          console.log(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
          return res.json(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
        }
        const hostWaitingQueue = {
          parkingId: parkingSpotID,
          bookedBy: email,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        await Profiles.updateOne(
          { email: email },
          { $push: { driverWaitingQueue: driverWaitingQueue } }
        )

        await Profiles.updateOne(
          { 'parkingSpots.parkingId': parkingSpotID },
          { $push: { 'parkingSpots.$.hostWaitingQueue': hostWaitingQueue } }
        )

        console.log('Your reservation is waiting for host approval')
        res.json('Your reservation is waiting for host approval')
      }
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async approveOrDeclineReq (req, res, next) {
    try {
      const {
        email = null,
        parkingSpotID = null,
        hostID = null,
        requireToDate = null,
        requireUntilDate = null,
        answer = null
      } = req.body

      const driverProfile = await Profiles.find({ email: email })
      const parkingId = parkingSpotID
      const parkingSpotProfile = await Profiles.find({
        parkingSpots: { $elemMatch: { parkingId } }
      })

      let fromTimeDate = new Date(requireToDate)
      let untilTimeDate = new Date(requireUntilDate)
      if (answer == 'true') {
        let driverOrderSpot = {
          parkingSpotID: parkingSpotID,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        if (!driverProfile.length || !parkingSpotProfile.length) {
          console.log(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
          return res.json(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
        }
        const futureReservations = {
          parkingId: parkingSpotID,
          bookedBy: email,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        await Profiles.updateOne(
          { email: email },
          { $push: { driverOrderSpot: driverOrderSpot } }
        )

        await Profiles.updateOne(
          { email: email },
          {
            $pull: {
              driverWaitingQueue: {
                parkingId: parkingSpotID,
                requireToDate: fromTimeDate,
                requireUntilDate: untilTimeDate
              }
            }
          }
        )

        await Profiles.updateOne(
          { 'parkingSpots.parkingId': parkingSpotID },
          { $push: { 'parkingSpots.$.futureReservations': futureReservations } }
        )

        await Profiles.updateOne(
          { profileId: hostID, 'parkingSpots.parkingId': parkingId },
          {
            $pull: {
              'parkingSpots.$.hostWaitingQueue': {
                bookedBy: email,
                requireToDate: fromTimeDate,
                requireUntilDate: untilTimeDate
              }
            }
          }
        )

        console.log('ok')
        res.json('ok')
      } else if (answer == 'false')
      {
        let driverDeclineReservations = {
          parkingId: parkingSpotID,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        if (!driverProfile.length || !parkingSpotProfile.length) {
          console.log(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
          return res.json(
            'A parking spot with that parking ID, or a driver with that email address does not exist'
          )
        }
        const hostDeclineReservations = {
          parkingId: parkingSpotID,
          bookedBy: email,
          requireToDate: fromTimeDate,
          requireUntilDate: untilTimeDate
        }

        await Profiles.updateOne(
          { email: email },
          { $push: { driverDeclineReservations: driverDeclineReservations } }
        )

        await Profiles.updateOne(
          { email: email },
          {
            $pull: {
              driverWaitingQueue: {
                parkingId: parkingSpotID,
                requireToDate: fromTimeDate,
                requireUntilDate: untilTimeDate
              }
            }
          }
        )

        await Profiles.updateOne(
          { 'parkingSpots.parkingId': parkingSpotID },
          {
            $push: {
              'parkingSpots.$.hostDeclineReservations': hostDeclineReservations
            }
          }
        )

        await Profiles.updateOne(
          { profileId: hostID, 'parkingSpots.parkingId': parkingId },
          {
            $pull: {
              'parkingSpots.$.hostWaitingQueue': {
                bookedBy: email,
                requireToDate: fromTimeDate,
                requireUntilDate: untilTimeDate
              }
            }
          }
        )

        console.log('Reservation didnt approve by the host')
        res.json('Reservation didnt approvee by the host')
      }
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  }
}
