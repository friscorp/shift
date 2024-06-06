const { Schema, model } = require ('mongoose');

let shiftSchema = new Schema({
    Guild: String,
    Channel: String
});

module.exports = model('shiftSchema2346969', shiftSchema);