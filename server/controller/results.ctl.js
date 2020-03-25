const Profiles = require('../models/profiles');
module.exports = {
   /**Get without params */
   async getAllProfiles(req, res) {
      try {
         const arrProfile = []
         const profilesFound = await Profiles.find({})
         profilesFound.map(profile => {
            arrProfile.push(profile.profileId, profile.firstName, profile.lastName, profile.email, profile.paymentMethod, profile.parkingSpots, profile.driverLicensePlate, profile.driverCarSize, profile.totalRankDriver, profile.driverOrderSpot, profile.driverReviews)
         })
         console.log(arrProfile);
         return res.json(arrProfile);
      } catch (err) { console.error(err);return res.json(err); }
   },

   async getAllHosts(req, res) {
      try {
         const arrHosts = []
         const hostsFound = await Profiles.find({})
         hostsFound.map(profile => {
            if( profile.parkingSpots.length != 0)
            {
               arrHosts.push(profile.firstName, profile.lastName, profile.parkingSpots[0])
            }
         })
         console.log(arrHosts);
         return res.json(arrHosts);
      } catch (err) { console.error(err);return res.json(err); }
   },

   async getAllAvailableParking(req, res) {
      try {
         const arrAvailable = []
         const AvailableFound = await Profiles.find({})
         AvailableFound.map(profile => {
            profile.parkingSpots.map(parkingSpot => {
               if(parkingSpot.availability != "no" && parkingSpot.length != 0)
               {
                  arrAvailable.push(parkingSpot);
               }
            })
         })
         console.log(arrAvailable);
         return res.json(arrAvailable);
      } catch (err) { console.error(err);return res.json(err); }
   },

   async getAllParkingSpots(req, res) {
      try {
         const arrAllParking = []
         const AllParkingFound = await Profiles.find({})
         AllParkingFound.map(profile => {
            if(profile.parkingSpots.length != 0)
            {
               arrAllParking.push(profile.firstName, profile.lastName, profile.parkingSpots)
            }
         })
         console.log(arrAllParking);
         return res.json(arrAllParking);
      } catch (err) { console.error(err);return res.json(err); }
   },

   async getAllDrivers(req, res) {
      try {
         const arrDrivers = []
         const driversFound = await Profiles.find({})
         driversFound.map(profile => {
            if(profile.driverLicensePlate.length != 0)
            {
               arrDrivers.push(profile.firstName, profile.lastName, profile.driverLicensePlate, profile.driverCarSize, profile.totalRankDriver, profile.driverOrderSpot, profile.driverReviews)
            }
         })
         console.log(arrDrivers);
         return res.json(arrDrivers);
      } catch (err) { console.error(err);return res.json(err); }
   },

/***
 *
 * 
 * 
 * 
 * 
 */
/**Get with params */
async getAllParkingReviewsByProfile(req, res, next) {
   try {
      const { email = null } = req.query;
      const result = await Profiles.find({ "email": email });
      const allReviews = [];
      result.map(parkingSpot => {
         parkingSpot.parkingSpots.map(hostReview => {
            allReviews.push(hostReview.hostReviews);
         })
      })
      console.log(allReviews);
      res.json(allReviews);
   } catch (err) 
   { console.error(err);
      return res.json(err); 
   };
},

async getSpecificDriverReviews(req, res, next) {
   try {
      const { email = null } = req.query;
      const result = await Profiles.find({ "email": email });
      console.log(result[0].driverReviews);
      res.json(result[0].driverReviews);
   } catch (err) 
   { console.error(err);
      return res.json(err); 
   };
},





/***
 *
 * 
 * 
 * 
 * 
 */
/**Post */
   async addProfileBasic(req, res, next) {
      try {
         const { firstName = null, lastName = null, email = null } = req.body;
         
         const userFound = await Profiles.find({ email: email });
         if (userFound.length) {
            console.log("A profile with that email account already exist");
            return res.json("A profile with that email account already exist");
         }
         else {
            const newProfile = new Profiles({

               firstName: firstName,
               lastName: lastName,
               email: email,
            });
            await newProfile.save()
            console.log(`saved document: ${newProfile}`);
            res.json({ newProfile });


         }
      } catch (err) { console.error(err);return res.json(err); };
   },

   async editDriverProfile(req, res, next) {
      try {
         const { email = null, driverLicensePlate = null, driverCarSize = null } = req.body;
         const userFound = await Profiles.find({ email: email });
         if (!userFound.length) {
            console.log("A profile with that gmail account isn't exist");
            return res.json("A profile with that gmail account isn't exist");
         }
         else {
            await Profiles.updateMany(
               { "email": email },
               { $set: { "driverLicensePlate": driverLicensePlate, "driverCarSize": driverCarSize } }
            )
            console.log(`${email}'s profile updated: \n driverLicensePlate -> ${driverLicensePlate} \n driverCarSize -> ${driverCarSize}`);
            res.json(`${email}'s profile updated: driverLicensePlate -> ${driverLicensePlate}, driverCarSize -> ${driverCarSize}`);
         }

      } catch (err) { console.error(err);return res.json(err); };

   },

   async addNewParkingSpot(req, res, next) {
      try {
         const { email = null, address = null, policy = null, parkingSize = null, price = null, windowsOfTime = null } = req.body;
         const userFound = await Profiles.find({ email: email });
         if (!userFound.length) {
            console.log("A profile with that gmail account isn't exist");
            return res.json("A profile with that gmail account isn't exist");
         }
         else {
            let parkingSpot = { "address": address, "policy": policy, "parkingSize": parkingSize, "price": price, "windowsOfTime": windowsOfTime }
            await Profiles.updateMany(
               { "email": email },
            {$push: {parkingSpots: parkingSpot}}
               )
            console.log(`new host created`);
            res.json('new host created');
         }

      } catch (err) { console.error(err);return res.json(err); };

   },

   async editSpecificParking(req, res, next) {
      try {
         const { parkingId = null, address = null, policy = null, parkingSize = null, price = null, windowsOfTime = null } = req.body;
         const parkingIDFound = await Profiles.find({ parkingSpots: {$elemMatch: {parkingId }}});
         if (!parkingIDFound.length) {
            console.log("A parking spot with that ID does not exist");
            return res.json("A parking spot with that ID does not exist");
         }
         else {
            let parkingSpot = { "parkingId": parkingId,"address": address, "policy": policy, "parkingSize": parkingSize, "price": price, "windowsOfTime": windowsOfTime }
            await Profiles.updateOne(
               { parkingSpots: {$elemMatch: {parkingId: parkingId }} },
               { $set: { 'parkingSpots.$.parkingId': parkingSpot.parkingId,
               'parkingSpots.$.address': parkingSpot.address,
               'parkingSpots.$.policy': parkingSpot.policy,
               'parkingSpots.$.parkingSize': parkingSpot.parkingSize,
               'parkingSpots.$.price': parkingSpot.price,
               'parkingSpots.$.windowsOfTime': parkingSpot.windowsOfTime, } }
            )
            console.log(`${parkingId}'s parking spot has been updated`);
            res.json(`${parkingId}'s parking spot has been updated`);
         }

      } catch (err) { console.error(err);return res.json(err); };

   },

   async hostWriteReviewOnDriver(req, res) {
      try {
         let { profileId = null, parkingId = null, reviewFrom = null, rank = null, review = null, date = null  } = req.body
         const userFound = await Profiles.find({ profileId: profileId });
         if (!userFound.length) {
             console.log("A profile with that profileId account does not exist");
             return res.json("A profile with that profileId account does not exist");
         }
         else {
             let reviewObj = {
                 "reviewFrom": reviewFrom,
                 "rank": rank,
                 "review": review,
                 "date": date
             }
          await Profiles.updateOne(
                 {"profileId": profileId, "parkingSpots.parkingId": parkingId},
                 { $push: {'parkingSpots.$.hostReviews': reviewObj} }
             )
             }
         return res.json(`${reviewFrom} wrote a review.........Rank: ${rank}.........Review: ${review}.........Date: ${date}`);
      } catch (err) { console.error(err);return res.json(err); }
  },

}