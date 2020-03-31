const Profiles = require('../models/profiles');

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

/***
 *
 * 
 * 
 * 
 * 
 */
/**Post */
async bookParkingSpot(req, res, next) {
    try {
       const { email = null, parkingSpotID = null, requireToDate = null, requireUntilDate = null } = req.body;

       const driverProfile = await Profiles.find({ "email": email});
       const parkingId = parkingSpotID
       const parkingSpotProfile = await Profiles.find({ parkingSpots: {$elemMatch: {parkingId }}});

       let fromTimeDate = new Date(requireToDate)
       let untilTimeDate = new Date(requireUntilDate)

       let driverOrderSpot = {
        "parkingSpotID": parkingSpotID,
        "requireToDate": fromTimeDate,
        "requireUntilDate": untilTimeDate,
    }

       if ((!driverProfile.length)||(!parkingSpotProfile.length)) {
        console.log("A parking spot with that parking ID, or a driver with that email address does not exist");
        return res.json("A parking spot with that parking ID, or a driver with that email address does not exist");
     }
        const futureReservations = {
            "bookedBy": email,
            "requireToDate": fromTimeDate,
            "requireUntilDate": untilTimeDate,
        };

        await Profiles.updateOne
        (
            {"email": email},
            { $push: {'driverOrderSpot': driverOrderSpot} }
        )

        await Profiles.updateOne(
            {"parkingSpots.parkingId": parkingSpotID},
                 { $push: {'parkingSpots.$.futureReservations': futureReservations} }
            )

       console.log("ok");
       res.json("ok");
    } catch (err) 
    { console.error(err);
       return res.json(err); 
    };
 },

}