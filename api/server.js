let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const path = require("path");

let assignment = require('./routes/assignments');
let matiere = require('./routes/matieres');
let image = require('./routes/images');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

const uri = "mongodb+srv://andy:master2021root@cluster0.4nfqp.mongodb.net/assignmentdb?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) =>  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/matieresall')
  .get(matiere.getAllMatieres);

app.route(prefix + '/matieres')
  .get(matiere.getMatieres)
  .post(matiere.postMatiere)
  .put(matiere.updateMatiere);

app.route(prefix + '/matieres/:id')
  .get(matiere.getMatiere)
  .delete(matiere.deleteMatiere);

app.route(prefix + '/images')
  .post(image.postImage);

app.route(prefix + '/images/:id')
  .get(image.getImageAsFile);

  app.route(prefix + '/imagesData/:id')
  .get(image.getImage);

app.use(express.static(__dirname + "/frontdist/"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontdist/index.html"));
});

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré  sur http://localhost:' + port);

module.exports = app;


