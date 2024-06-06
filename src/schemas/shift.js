const { Schema, model} = require('mongoose');

let test = new Schema({
    Guild: String,
    time: Number,
    user: String,
    shiftid: String
});

module.exports = model('shiftSchema13421422', test);
