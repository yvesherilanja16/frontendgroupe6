const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
const db = require("./model");
const Role = db.role;

let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

//const uri = "mongodb+srv://andy:master2021root@cluster0.4nfqp.mongodb.net/assignmentdb?retryWrites=true&w=majority";
const uri = "mongodb+srv://yvesherilanja:HerilanjA4311@clusterangularnode.z1wlf.mongodb.net/assignments?retryWrites=true&w=majority";
//const uri = "mongodb://localhost:27017/mbds";

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
    initial();
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });
    app.use(bodyParser.urlencoded({ extended: true }));
// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) =>  {
 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);


app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

  app.use(express.static(__dirname + "/frontdist/"));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/frontdist/index.html"));
  });
 

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré  sur http://localhost:' + port);

//fonction initial
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "eleve"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'eleve' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = app;


