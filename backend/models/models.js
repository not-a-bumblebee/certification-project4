const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quote = new Schema({
    quote: String,
    author: String,
    category: String


});

const QuoteList = new Schema({
    name: String,

    quotes: [Quote]
})



const User = new Schema({
    username: String,
    pw: String,
    masterList: [QuoteList]
})

module.exports = mongoose.model("users", User)

