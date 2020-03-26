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
                if(plateNumber.length == 0){
                    // add date to this queryti find the specific park on a specific date
                    await Profiles.updateOne(
                        {"driverOrderSpot.parkingSpotID": parkingId},
                        { $set: {'driverOrderSpot.$.exitTime': Date.now() } }
                    )
                }
                else{
                    // Need to add validation function to check if this numberPlate exist in the system
                    await Profiles.updateOne(
                        {"driverLicensePlate": plateNumber, "driverOrderSpot.parkingSpotID": parkingId},
                        { $set: {'driverOrderSpot.$.enteredTime': Date.now() } }
                    )
                }
                }
            return res.json(plateNumber);
         } catch (err) { console.error(err);return res.json(err); }
    }
}

