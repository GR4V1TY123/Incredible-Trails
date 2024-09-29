const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require('./user');
const opts = { toJSON: {virtuals: true}};

const trailSchema = new Schema({
    name: String,
    location: String,
    description: String,
    price: String,
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
})

module.exports = new mongoose.model('Trail', trailSchema);
