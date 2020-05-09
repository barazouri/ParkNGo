const Profiles = require('../models/profiles')
var AvailabilitySchedule = require('availability-schedule')

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
  async searchParkingSpotByLocation (req, res, next) {
    try {
      const { address = null } = req.query
      const result = await Profiles.find()
      if (!result.length) {
        console.log('A parking spot with that address does not exist')
        return res.json([])
      }
      const allParkingSpots = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          if (
            parkingSpot.address == address &&
            (parkingSpot.availability == 'yes') |
              (parkingSpot.availability == '')
          ) {
            allParkingSpots.push(parkingSpot)
          }
        })
      })
      console.log(allParkingSpots)
      res.json(allParkingSpots)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async searchParkingSpotByLocationAndPrice (req, res, next) {
    try {
      const { address = null, fromPrice = null, toPrice = null } = req.query
      const result = await Profiles.find({
        parkingSpots: {
          $elemMatch: { price: { $gte: fromPrice }, price: { $lte: toPrice } }
        }
      })
      if (!result.length) {
        console.log('A parking spot with that address does not exist')
        return res.json([])
      }
      const allParkingSpots = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          if (
            parkingSpot.address == address &&
            parkingSpot.availability == 'yes' &&
            parkingSpot.price >= fromPrice &&
            parkingSpot.price <= toPrice
          ) {
            allParkingSpots.push(parkingSpot)
          }
        })
      })
      console.log(allParkingSpots)
      res.json(allParkingSpots)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async searchParkingSpotByLocationAndPriceAndSize (req, res, next) {
    try {
      const {
        email = null,
        address = null,
        fromPrice = null,
        toPrice = null
      } = req.query
      const profileResult = await Profiles.find({ email: email })
      let result = []
      result = await Profiles.find({
        parkingSpots: {
          $elemMatch: { price: { $gte: fromPrice }, price: { $lte: toPrice } }
        }
      })
      if (!result.length) {
        console.log('')
        return res.json([])
      }
      const allParkingSpots = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          if (
            parkingSpot.address == address &&
            parkingSpot.availability == 'yes' &&
            parkingSpot.price >= fromPrice &&
            parkingSpot.price <= toPrice
          ) {
            if (profileResult[0].driverCarSize == 'small') {
              allParkingSpots.push(parkingSpot)
              console.log('car size is small')
            }
            if (
              profileResult[0].driverCarSize == 'medium' &&
              (parkingSpot.parkingSize == 'medium' ||
                parkingSpot.parkingSize == 'big')
            ) {
              allParkingSpots.push(parkingSpot)
              console.log('car size is medium')
            }
            if (
              profileResult[0].driverCarSize == 'big' &&
              parkingSpot.parkingSize == 'big'
            ) {
              allParkingSpots.push(parkingSpot)
              console.log('car size is big')
            }
          }
        })
      })
      console.log(allParkingSpots)
      res.json(allParkingSpots)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async searchByLocationAndPriceAndSizeByTime (req, res, next) {
    //for now works for one futureReservation
    try {
      const {
        email = null,
        address = null,
        fromPrice = null,
        toPrice = null,
        fromTime = null,
        untilTime = null
      } = req.query
      const profileResult = await Profiles.find({ email: email })
      let result = []
      let fromTimeDate = new Date(fromTime)
      let untilTimeDate = new Date(untilTime)
      result = await Profiles.find({
        parkingSpots: {
          $elemMatch: { price: { $gte: fromPrice }, price: { $lte: toPrice } }
        }
      })
      if (!result.length) {
        console.log([])
        return res.json([])
      }
      const allParkingSpots = []
      const resultParkingSpots = []
      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          if (
            parkingSpot.address == address &&
            parkingSpot.availability == 'yes' &&
            parkingSpot.price >= fromPrice &&
            parkingSpot.price <= toPrice
          ) {
            parkingSpot.windowsOfTime.map(window => {
              let from =
                window.AvailablefromTime.getTime() - fromTimeDate.getTime()
              let until =
                window.AvailableUntilTime.getTime() - untilTimeDate.getTime()
              if (from < 0 && until > 0) {
                // console.log('enter')
                if (profileResult[0].driverCarSize == 'small') {
                  allParkingSpots.push(parkingSpot)
                  // console.log("car size is small")
                }
                if (
                  profileResult[0].driverCarSize == 'medium' &&
                  (parkingSpot.parkingSize == 'medium' ||
                    parkingSpot.parkingSize == 'big')
                ) {
                  allParkingSpots.push(parkingSpot)
                  // console.log("car size is medium")
                }
                if (
                  profileResult[0].driverCarSize == 'big' &&
                  parkingSpot.parkingSize == 'big'
                ) {
                  allParkingSpots.push(parkingSpot)
                  // console.log("car size is big")
                }
              }
            })
          }
        })
      })

      allParkingSpots.map(parkingSpot => {
        var schedule = new AvailabilitySchedule(
          parkingSpot.windowsOfTime.AvailablefromTime,
          parkingSpot.windowsOfTime.AvailableUntilTime
        ) // Second week of Jan 2017
        parkingSpot.windowsOfTime.map(window => {
          // schedule.addWeeklyRecurringAvailability('2017-01-04T09:00:00Z', '2017-01-04T17:00:00Z', [1, 2, 3, 4, 5]); // Mon-Fri 9am-5pm UTC, starting on Wed Jan 4th
          schedule.addAvailability(
            window.AvailablefromTime,
            window.AvailableUntilTime
          ) // Sat Jan 14 12pm-3pm UTC

          schedule.getAvailabilities('+0100')
        })
        parkingSpot.futureReservations.map(future => {
          schedule.removeAvailability(
            future.requireToDate,
            future.requireUntilDate
          )
        })
        if (schedule.isAvailable(fromTime, untilTime)) {
          resultParkingSpots.push(parkingSpot)
        }
      })

      //    allParkingSpots.map(parkingSpot => {
      //       console.log("parkingSpot.futureReservations: ");
      //       console.log("length: " + parkingSpot.futureReservations.length + ' parkingId: ' + parkingSpot.parkingId)
      //       if(parkingSpot.futureReservations.length <= 0)
      //       {
      //          resultParkingSpots.push(parkingSpot);
      //          console.log("enter first: ");
      //          console.log(resultParkingSpots);
      //       }
      //       parkingSpot.futureReservations.map(future => {
      //          let futureFromMFrom = future.requireToDate.getTime() - fromTimeDate.getTime()//
      //          let futureFromMUntil = future.requireToDate.getTime() - untilTimeDate.getTime()//
      //          let futureUntilMFrom = future.requireUntilDate.getTime() - fromTimeDate.getTime()//
      //          let futureUntilMUntil = future.requireUntilDate.getTime() - untilTimeDate.getTime()//
      //       if((futureFromMFrom > 0)&&(futureFromMUntil > 0))
      //       {
      //          console.log("2");
      //          console.log("futureFromMUntil: " + futureFromMUntil)
      //          resultParkingSpots.push(parkingSpot);
      //          console.log("enter second: ");
      //          console.log(resultParkingSpots);
      //       }
      //       if((futureUntilMFrom < 0)&&(futureUntilMUntil < 0))
      //       {
      //          console.log("3");
      //          resultParkingSpots.push(parkingSpot);
      //          console.log("enter third: ");
      //          // console.log(resultParkingSpots);
      //       }
      //    })
      // })
      console.log(resultParkingSpots)
      res.json(resultParkingSpots)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  },

  async searchByLocationAndPriceAndSizeByCurrentTime (req, res, next) {
    try {
      const {
        email = null,
        address = null,
        fromPrice = null,
        toPrice = null,
        untilTime = null
      } = req.query
      const profileResult = await Profiles.find({ email: email })
      let result = []
      // let fromTimeDate = new Date.now()
      let untilTimeDate = new Date(untilTime)
      result = await Profiles.find({
        parkingSpots: {
          $elemMatch: { price: { $gte: fromPrice }, price: { $lte: toPrice } }
        }
      })
      if (!result.length) {
        console.log([])
        return res.json([])
      }
      const allParkingSpots = []
      const resultParkingSpots = []

      result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {
          if (
            parkingSpot.address == address &&
            parkingSpot.availability == 'yes' &&
            parkingSpot.price >= fromPrice &&
            parkingSpot.price <= toPrice
          ) {
            parkingSpot.windowsOfTime.map(window => {
              let from = window.AvailablefromTime.getTime() - Date.now()
              let until =
                window.AvailableUntilTime.getTime() - untilTimeDate.getTime()
              if (from < 0 && until > 0) {
                console.log('enter')
                if (profileResult[0].driverCarSize == 'small') {
                  allParkingSpots.push(parkingSpot)
                  console.log('car size is small')
                }
                if (
                  profileResult[0].driverCarSize == 'medium' &&
                  (parkingSpot.parkingSize == 'medium' ||
                    parkingSpot.parkingSize == 'big')
                ) {
                  allParkingSpots.push(parkingSpot)
                  console.log('car size is medium')
                }
                if (
                  profileResult[0].driverCarSize == 'big' &&
                  parkingSpot.parkingSize == 'big'
                ) {
                  allParkingSpots.push(parkingSpot)
                  console.log('car size is big')
                }
              }
            })
          }
        })
      })

      const start = new Date().toISOString()

      allParkingSpots.map(parkingSpot => {
        var schedule = new AvailabilitySchedule(
          parkingSpot.windowsOfTime.AvailablefromTime,
          parkingSpot.windowsOfTime.AvailableUntilTime
        ) // Second week of Jan 2017
        parkingSpot.windowsOfTime.map(window => {
          // schedule.addWeeklyRecurringAvailability('2017-01-04T09:00:00Z', '2017-01-04T17:00:00Z', [1, 2, 3, 4, 5]); // Mon-Fri 9am-5pm UTC, starting on Wed Jan 4th
          schedule.addAvailability(
            window.AvailablefromTime,
            window.AvailableUntilTime
          ) // Sat Jan 14 12pm-3pm UTC

          schedule.getAvailabilities('+0100')
        })
        parkingSpot.futureReservations.map(future => {
          schedule.removeAvailability(
            future.requireToDate,
            future.requireUntilDate
          )
        })
        console.log(start)
        if (schedule.isAvailable(start, untilTime)) {
          resultParkingSpots.push(parkingSpot)
        }
      })
      console.log(resultParkingSpots)
      res.json(resultParkingSpots)
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  }
  /***
   *
   *
   *
   *
   *
   */
  /**Post */
}
