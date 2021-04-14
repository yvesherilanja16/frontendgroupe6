let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ImageSchema = Schema({
    id: String,
    nom: String,
    type: String,
    data: String
},{ collection: 'image' });

module.exports = mongoose.model('image', ImageSchema);
