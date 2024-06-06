const { Schema, model} = require('mongoose');

let test = new Schema({
    shiftid: String,
    password: String
});

module.exports = model('shiftIds968', test);