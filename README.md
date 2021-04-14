# frontendgroupe6

Pour pouvoir utiliser le projet, clonez ce repository.

Pour lancer le projet se mettre dans le dossier api et lancer `node server.js`,  le projet angular(plus exactemnet sa derniere build) est alors disponible sur localhost:8081 (ou l'adresse et le port spécifié)

Pour lancer le frontend et le backend séparement lancer `node server.js` dans le dossier de l'api , et `npm run start` dans le dossier frontend 
Pour mettre à jour la build du frontend dans le dossier api , se mettre dans le dossier du frontend et lancer `npm run buildheroku` (recommandé pour les premiers lancements)

La branche main sera la branche mise a jour coté source , et la branche heroku sera celle deployee vers heroku.  A noter que lors du deployement seul une sous branche est deployée vers heroku.

PROJET: Assignment 

DESCRIPTION: 
Projet qui permet de manipuler des assignements qu'on attribue a des eleves , donnés par des profs sur une certaine matiere donnée

FONCTIONALITES: 
-Ajout/modification/liste/suppression de matières avec une photo du prof et une photo de la matière (stockés dans mongodb et modifiables)
-Ajout/modification/liste/suppression d'assignement
-Rendu rapide d'un assignement grace au drag and drop entre les deux colonnes 
-Pagination des matières
-Scroll infini sur les colonnes d'assignements rendus ou nons
-Modificaiton de notes seulement apres avoir rendu un assignment
-Authentification (admin)
-Tout est combiné en un seul heroku (le serveur de l'api fait sert aussi les fichiers d'angular)


SOURCES ET DOCUMENTATIONS:
https://material.angular.io/components/ (composants)
https://material.angular.io/cdk/ (drag and drop)
https://blog.danieleghidoli.it/2016/10/22/http-rxjs-observables-angular/ (combinaisons d'observables)
https://github.com/angular/flex-layout/wiki/Declarative-API-Overview (flex)
https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate (mongoose pipeline)
https://vegibit.com/mongoose-relationships-tutorial/ (relation dans mongoose, utile pour effectuer des "jointures" sur les données trop repetitives)
https://developer.mozilla.org/fr/docs/Web/API/FileReader/readAsDataURL (conversion d'image en base64)
https://stackoverflow.com/questions/28568816/express-js-how-to-download-base64-string-as-pdf-file/42626348#answer-42626348 (telechargement depuis base64)