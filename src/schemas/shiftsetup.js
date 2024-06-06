const { Schema, model} = require('mongoose');

let ss = new Schema({
    Guild: String,
    Category: String,
});

module.exports = model('shiftSchemaSetup', ss);