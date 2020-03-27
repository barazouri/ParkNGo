const Profiles = require('../models/profiles');
var distance = require('google-distance');

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
async searchParkingSpotByLocation(req, res, next) {
    try {
       const { address = null } = req.query;
       const result = await Profiles.find();
       if (!result.length) {
        console.log("A parking spot with that address does not exist");
        return res.json("A parking spot with that address does not exist");
     }
       const allParkingSpots = [];
       result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {

            if((parkingSpot.address == address)&&(parkingSpot.availability == "yes"))
            {
            allParkingSpots.push(parkingSpot);
            }
          })
       })
       console.log(allParkingSpots);
       res.json(allParkingSpots);
    } catch (err) 
    { console.error(err);
       return res.json(err); 
    };
 },

 async searchParkingSpotByLocationAndPrice(req, res, next) {
    try {
       const { address = null, fromPrice = null, toPrice = null } = req.query;
       const result = await Profiles.find({ parkingSpots: {$elemMatch: {price:{$gte: fromPrice} ,price:{$lte: toPrice}}}});
    //    console.log(result)
       if (!result.length) {
        console.log("A parking spot with that address does not exist");
        return res.json("A parking spot with that address does not exist");
     }
       const allParkingSpots = [];
       result.map(profile => {
        profile.parkingSpots.map(parkingSpot => {

            if((parkingSpot.address == address)&&(parkingSpot.availability == "yes")&&(parkingSpot.price >= fromPrice) && (parkingSpot.price <= toPrice))
            {
            allParkingSpots.push(parkingSpot);
            }
          })
       })
       console.log(allParkingSpots);
       res.json(allParkingSpots);
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


}