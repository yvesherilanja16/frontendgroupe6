import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css']
})
export class EditMatiereComponent implements OnInit {
  matiere:Matiere;

  // pour le formulaire
  nom = "";
  prof = "";
  imageProfFile: File = null;
  imageMatiereFile: File = null;

  constructor(
    private matieresService: MatieresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/matiere/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getMatiereById();
  }

  handleImageProfFileInput(files: FileList){
    if(files.length >0){
      this.imageProfFile = files.item(0);
    }
  }

  handleImageMatiereFileInput(files: FileList){
    if(files.length >0){
      this.imageMatiereFile = files.item(0);
    }
  }

  getMatiereById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: string = this.route.snapshot.params.id;

    this.matieresService.getMatiere(id).subscribe((matiere) => {
      this.matiere = matiere;

      this.nom = matiere.nom;
      this.prof = matiere.prof;

    });
  }


  onSubmit(event) {
    // on va modifier l'matiere
    if((!this.nom) || (!this.prof)) return;

    this.matiere.nom = this.nom;
    this.matiere.prof = this.prof;


    this.matieresService.updateMatiere(this.matiere, this.imageProfFile,this.imageMatiereFile)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/matiere"]);
      })

  }
}
