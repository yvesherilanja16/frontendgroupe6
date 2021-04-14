let Matiere = require("../model/matiere");
let Assignment = require("../model/assignment");
let ImageService = require("../services/imageservice");
var ObjectId = require('mongoose').Types.ObjectId; 
// toutes les matieres, paginées
function getMatieres(req, res) {
  var aggregateQuery = Matiere.aggregate();
  
  Matiere.aggregatePaginate(
    aggregateQuery,
    {
       page: parseInt(req.query.page) || 1,
       limit: parseInt(req.query.limit) || 10,
    },
    (err, matieres) => {
      if (err) {
        res.send(err);
      } else { 
        res.send(matieres);
      }
    }
  );
}

function getAllMatieres(req, res) {
  Matiere.find((err,matieres)=>{
    if (err) {
      res.send(err);
    } else { 
      res.send(matieres);
    }
  })
}

// Récupérer une matiere par son id (GET)
function getMatiere(req, res) {
  let matiereId = req.params.id;

  Matiere.findOne({ id: matiereId }, (err, matiere) => {
    if (err) {
      res.send(err);
    }
    res.json(matiere);
  });
}

// Ajout d'une matiere (POST)
function postMatiere(req, res) {
  console.log("POST matiere reçu ");
  console.log("Ajout d'images");
  let imageProf = req.body.imageProf;
  let imageMatiere = req.body.imageMatiere;
  let ajouts = [ImageService.saveImage(imageProf), ImageService.saveImage(imageMatiere)];
  Promise.all(ajouts).then(([imProf,imMatiere]) =>{
    console.log("Images Ajoutees"); 
    let matiere = new Matiere();
    matiere.id = req.body.id;
    matiere.nom = req.body.nom;
    matiere.prof = req.body.prof;
    matiere.imageProf = imProf?.id;
    matiere.imageMatiere = imMatiere?.id;
    console.log(matiere);
    
    matiere.save((err) => {
      if (err) {
        res.send("cant post matiere ", err);
      }
      res.json({ message: `${matiere.nom} saved!` });
    });
  }).catch((err)=>{
    console.log("Erreur");
    console.error(err)
  })
}

// Update d'une matiere (PUT)
function updateMatiere(req, res) {
  console.log("UPDATE recu matiere : ");
  console.log(req.body);
  Matiere.findOne({ id: matiereId }, (err, matiere) => {
    if (err) {
      res.send(err);
    } else {


      let imageProf = req.body.imageProf;
      let imageMatiere = req.body.imageMatiere;
      let ajouts = [ImageService.saveImage(imageProf), ImageService.saveImage(imageMatiere)];
      Promise.all(ajouts).then(([imProf,imMatiere]) =>{
        let updata = {...req.body};
        if(imProf != null){
          updata.imageProf = imProf.id;
        } else {
          updata.imageProf = matiere.imageProf;
        }
          
        if(imMatiere!=null){
          updata.imageMatiere = imMatiere.id;
        } else {
          updata.imageMatiere = matiere.imageMatiere;
        }
        Matiere.findByIdAndUpdate(
          req.body._id,
          updata,
          { new: true },
          (err, matiere) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.json({ message: "updated" });
            }
            
            // console.log('updated ', matiere)
          }
          );
      });
      }
  });
}

// suppression d'une matiere (DELETE)
function deleteMatiere(req, res) {
  Matiere.findOne({ id: req.params.id }, (err, matiere) => {
    if (err) {
      res.send(err);
    }
    console.log(matiere);
    Assignment.find({matiere: new ObjectId(matiere._id)}).remove((err)=>{
      if (err) {
        res.send(err);
      }
      Matiere.remove( {id: req.params.id},(err,matiere1) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: `${matiere.nom} deleted` });
      } )
    })
  });
}

module.exports = {
  getMatieres,
  getAllMatieres,
  postMatiere,
  getMatiere,
  updateMatiere,
  deleteMatiere,
};
