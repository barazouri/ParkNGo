const mongoose = require('mongoose');

const schema = {
    profileId: { type: Number, index: 1},
    firstName: String,
    lastName: String,
    email: String,
    paymentMethod: [{
        creditCardNumber: Number,
        expiryDate: Date,
        nameOnCard: String,
        bankAccount: Number,
    }],
        parkingSpots: [{
            parkingId: String,
            address: String,
            policy: String,
            parkingSize: String,
            price: Number,
            windowsOfTime: [{
                AvailablefromTime: Date,
                AvailableUntilTime: Date
            }],
            availability: String,
            directions: String,
            totalRankParking: Number,
            hostReviews: [{
                reviewFrom: String,
                rank: Number,
                review: String,
                date: Date
            }],
            parkingPictures: [{
                imageUrl: String
            }],
        }],
        driverLicensePlate: String,
        driverCarSize: String,
        totalRankDriver: Number,
        driverOrderSpot: [{
            parkingSpotID: String,
            requireToDate: Date,
            requireUntilDate: Date,
            periodOfTime: String,
            enteredTime: Date,
            exitTime: Date
        }],
        driverReviews: [{
            reviewFrom: String,
            rank: Number,
            review: String,
            date: Date
        }]
}

const user_schema = new mongoose.Schema(schema);
const profile = mongoose.model('profile' ,user_schema);
module.exports = profile;