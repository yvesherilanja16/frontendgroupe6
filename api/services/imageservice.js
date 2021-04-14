let Image = require("../model/image");

function saveImage(imagemodel) {
    return new Promise((resolve,reject) => {
        if(imagemodel == null || imagemodel == undefined){
            resolve(null);
        }
        let image = new Image();
        image.id = imagemodel.id;
        image.nom = imagemodel.nom;
        image.data = imagemodel.data;
        image.type = imagemodel.type;
        
        console.log("Ajout image :");
        console.log(image);
        
        image.save((err) => {
            if (err) {
                reject(err);
            }
            else resolve(image);
        });
    });
}
  
  module.exports = {saveImage}