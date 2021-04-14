import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css'],
})
export class AddMatiereComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  prof = '';
  imageProfFile: File = null;
  imageMatiereFile: File = null;

  constructor(private matieresService:MatieresService,
              private router:Router) {}

  ngOnInit(): void {}

  onSubmit(event) {
    if((!this.nom) || (!this.prof)) return;

    let nouvelleMatiere = new Matiere();
    nouvelleMatiere.nom = this.nom;
    nouvelleMatiere.prof = this.prof;

    this.matieresService.addMatiere(nouvelleMatiere,this.imageProfFile,this.imageMatiereFile)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/matiere"]);
      });
  }

  handleImageProfFileInput(files: FileList){
    this.imageProfFile = files.item(0);
  }

  handleImageMatiereFileInput(files: FileList){
    this.imageMatiereFile = files.item(0);
  }

}
