let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;
// edit utilisation de l'id manuel plutot que celui automatique, plus de lectures d'images en front qu'en back 
let MatiereSchema = Schema({
    id: String,
    nom: String,
    prof: String,
    imageProf: String,
    imageMatiere: String
},{ collection: 'matiere' });

MatiereSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('matiere', MatiereSchema);
