const Profiles = require('../models/profiles');
// const axios = require('axios');
// let newArr = require('./class/ResultGenerator');            //my class into controller/class
module.exports = {
   async getAllProfiles(req, res) {
      try {
         const arrProfile = []
         const profilesFound = await Profiles.find({})
         profilesFound.map(profile => {
            arrProfile.push(profile.profileId, profile.firstName, profile.lastName, profile.email, profile.paymentMethod, profile.parkingSpots, profile.driver)
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
            if(profile.parkingSpots.length != 0){
            if(profile.parkingSpots[0].availability == 'yes')
            {
               arrAvailable.push(profile.firstName, profile.lastName, profile.parkingSpots[0])
            }}
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
               arrAllParking.push(profile.firstName, profile.lastName, profile.parkingSpots[0])
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
            if(profile.driver.length != 0)
            {
               arrDrivers.push(profile.firstName, profile.lastName, profile.driver[0].licensePlate)
            }
         })
         console.log(arrDrivers);
         return res.json(arrDrivers);
      } catch (err) { console.error(err);return res.json(err); }
   },











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
}