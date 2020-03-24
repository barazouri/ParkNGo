const Profiles = require('../models/profiles');

module.exports = {
    async licensePlateUpdate(req, res) {
        try {
            let {plateNumber = null, profileId = null, parkingId = null} = req.body
            const userFound = await Profiles.find({ profileId: profileId });
            if (!userFound.length) {
                console.log("A profile with that gmail account isn't exist");
                return res.json("A profile with that gmail account isn't exist");
            }
            else {
             await Profiles.updateOne(
                    {"profileId": profileId, "parkingSpots.parkingId": parkingId},
                    { $set: {'parkingSpots.$.availability': plateNumber} }
                )
                }
            return res.json(plateNumber);
         } catch (err) { console.error(err);return res.json(err); }
    }
}


// async editSpecificParking(req, res, next) {
//     try {
//        const { parkingId = null, address = null, policy = null, parkingSize = null, price = null, windowsOfTime = null } = req.body;
//        const parkingIDFound = await Profiles.find({ parkingSpots: {$elemMatch: {parkingId }}});
//        if (!parkingIDFound.length) {
//           console.log("A parking spot with that ID does not exist");
//           return res.json("A parking spot with that ID does not exist");
//        }
//        else {
//           let parkingSpot = { "parkingId": parkingId,"address": address, "policy": policy, "parkingSize": parkingSize, "price": price, "windowsOfTime": windowsOfTime }
//           await Profiles.updateOne(
//              { parkingSpots: {$elemMatch: {parkingId: parkingId }} },
//              { $set: { parkingSpots: parkingSpot } }
//           )
//           // console.log(`${email}'s profile updated: \n driverLicensePlate -> ${driverLicensePlate} \n driverCarSize -> ${driverCarSize}`);
//           // res.json(`${email}'s profile updated: driverLicensePlate -> ${driverLicensePlate}, driverCarSize -> ${driverCarSize}`);
//        }

//     } catch (err) { console.error(err);return res.json(err); };

//  },