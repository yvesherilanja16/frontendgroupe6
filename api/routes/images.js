let Image = require("../model/image");

function getImage(req, res) {
  let imageId = req.params.id;

  Image.findOne({ id: imageId }, (err, image) => {
    if (err) {
      res.send(err);
    }
    res.json(image);
  });
}

function getImageAsFile(req,res){
  let imageId = req.params.id;

  Image.findOne({ id: imageId }, (err, image) => {
    if (err) {
      res.send(err);
    }
    else {

      res.writeHead(200, {
        'Content-Type': image.type,
        'Content-Disposition': `attachment; filename="${image.nom}"`,
      });
      
      const download = Buffer.from(image.data.split(",")[1], 'base64');
      
      res.end(download);
    }
  });
}

// Ajout d'une image (POST)
// En format json , 
// id:  nom unique pour telecharger
// nom: nom du fichier source
// data: base64 du fichier
// type : mime type ex: image/jpg, image/png,..  
function postImage(req, res) {
  let image = new Image();
  image.id = req.body.id;
  image.nom = req.body.nom;
  image.data = req.body.data;
  image.type = req.body.type;

  console.log("POST image reçu :");
  console.log(image);

  image.save((err) => {
    if (err) {
      res.send("cant post image ", err);
    }
    res.json({ message: `${image.nom} saved!` });
  });
}
/*
// suppression d'une image (DELETE)
function deleteImage(req, res) {
  Image.findByIdAndRemove(req.params.id, (err, image) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${image.nom} deleted` });
  });
}
*/
module.exports = {
  postImage,
  getImage,
  getImageAsFile
//  deleteImage,
};
