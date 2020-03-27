const mongoose = require('mongoose');

const schema = {
    profileId: { type: Number, index: 1},
    firstName: String,
    lastName: String,
    email: String,
    paymentMethod: [{
        creditCardNumber: Number,
        expiryDate: String,
        nameOnCard: String,
        bankAccount: Number,
    }],
        parkingSpots: [{
            parkingId: String,
            address: String,
            policy: String,
            parkingSize: String,
            price: Number,
            windowsOfTime: String,
            availability: String,
            directions: String,
            totalRankParking: Number,
            hostReviews: [{
                reviewFrom: String,
                rank: Number,
                review: String,
                date: String
            }],
        }],
        driverLicensePlate: String,
        driverCarSize: String,
        totalRankDriver: Number,
        driverOrderSpot: [{
            parkingSpotID: String,
            orderToDate: String,
            periodOfTime: String,
            enteredTime: Date,
            exitTime: Date,
        }],
        driverReviews: [{
            reviewFrom: String,
            rank: Number,
            review: String,
            date: String
        }]
}

const user_schema = new mongoose.Schema(schema);
const profile = mongoose.model('profile' ,user_schema);
module.exports = profile;