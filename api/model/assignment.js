let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matiere'
    },
    auteur: String,
},{ collection: 'assignment' , strict:'false'});

AssignmentSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignment', AssignmentSchema);
