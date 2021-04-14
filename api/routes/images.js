let Image = require("../model/image");
const ImageService = require("../services/imageservice")

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
  if(imageId == "null"){
    res.writeHead(404,"Fichier introuvable");
    return;
  }
  Image.findOne({ id: imageId }, (err, image) => {
    if (err) {
      res.send(err);
    }
    else {
      if(image.type == null){
        image.type = "image/png";
      }
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
  ImageService.saveImage(req.body).then((image)=>{
    res.json({ message: `${image.nom} saved!` });
  }).catch(err=>
    res.send("cant post image ", err)
  );
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
