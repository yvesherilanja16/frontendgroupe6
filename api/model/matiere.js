let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: String,
    nom: String,
    prof: String,
    imageProf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    imageMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
},{ collection: 'matiere' });

MatiereSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('matiere', MatiereSchema);
