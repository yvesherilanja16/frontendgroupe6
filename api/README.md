# MBDS_Madagascar2021_backend
Backend Et Frontend NodeJS Mongoose pour le cours angular MBDS Madagascar 2021
Le frontend (dont le resultat de la build est dans le dossier frontdist ) est servi par le server.js dans ce dossier ( pour faciliter le déployement)
Il suffit de lancer `node server.js` pour lancer le Frontend(dernière build) et le Backend. 
Pour déployer, faire un merge avec la branche heroku , se positioner dans la branche heroku , se mettre dans le dossier api et lancer la commande `npm run deployheroku` (requiert les identifiants heroku qui permettent d'accéder à l'application).