  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.eleveBoard = (req, res) => {
    res.status(200).send("eleve Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
 