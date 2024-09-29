const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require('./user');
const opts = { toJSON: {virtuals: true}};

const reviewSchema = new Schema({
    rating: Number,
    title: String,
    body: String,
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = new mongoose.model('Review', reviewSchema);