const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    //_id: by default primary key // we can't remove primary key as MySQL
    title: {
        type: String,
        required: true
    },
    team_name: {
        type: String
    },
    wins: {
        type: Number
    },
    defeats: {
        type: Number
    },
    author: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category_id: {
        //every artilce has one category: One-to-Many
        type: mongoose.Schema.Types.ObjectId, //Primary key as a foreign key
        ref: "category", //form category collection
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model("Article", articleSchema);