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
            Policy: String,
            parkingSize: String,
            price: Number,
            windowsOfTime: String,
            availability: String,
            hostReviews: [{
                reviewFrom: String,
                rank: Number,
                review: String,
                data: String
            }],
        }],
    driver: [{
        licensePlate: Number,
        parkingSpotOrderId: String,
        driverReviews: [{
            reviewFrom: String,
            rank: Number,
            review: String,
            data: String
        }]
    }]
}

const user_schema = new mongoose.Schema(schema);
const profile = mongoose.model('profile' ,user_schema);
module.exports = profile;