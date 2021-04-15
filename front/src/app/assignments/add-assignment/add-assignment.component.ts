import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/matieres/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { User } from 'src/app/_models/user';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  matieres:Matiere[] = [];
  matiere:Matiere = null;
  auteur = '';
  user: User;
  constructor(private assignmentsService:AssignmentsService,
              private matiereService:MatieresService,
              private router:Router,private authenticationService: AuthenticationService) {
                this.authenticationService.user.subscribe(x => this.user = x);
              }

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
    this.matiereService.getAllMatieres().subscribe((matieres)=>{
      this.matieres=matieres;
      console.log(matieres);
    })
  }

  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.note = null;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

}
