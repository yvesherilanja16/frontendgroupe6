import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Matiere } from 'src/app/matieres/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;
  matieres:Matiere[]=[];
  matiere:Matiere=null;
  nom = "";
  note = null;
  auteur = "";
  dateDeRendu = null;
  rendu = false;
  noteOld = null;

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService: MatieresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    forkJoin([
      this.getMatieres(),
      this.getAssignmentById()
    ]).subscribe(([_,assignment])=>{
      this.matiere = this.matieres.find(x => x.id == assignment.matiere.id);
      console.log(this.matiere);
    })
  }

  getMatieres(){
    let requeteMatiere = this.matiereService.getAllMatieres();
    requeteMatiere.subscribe((matieres)=>{
      this.matieres = matieres;
    })
    return requeteMatiere;
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    let requeteAssignment = this.assignmentsService.getAssignment(id);
    requeteAssignment.subscribe((assignment) => {
      console.log(assignment);
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.noteOld = assignment.note;
      this.note = assignment.note;
      this.auteur = assignment.auteur;
      this.rendu = assignment.rendu;
      // this.matiere = assignment.matiere;
      this.dateDeRendu = assignment.dateDeRendu;
    });
    return requeteAssignment;
  }

  renduChanged(){
    if(!this.rendu){
      this.note = null;
    } else {
      this.note = this.noteOld;
    }
  }

  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;
    if(this.note>20 || this.note<0){
      return;
    }

    this.assignment.nom = this.nom;
    this.assignment.auteur = this.auteur;
    this.assignment.rendu = this.rendu;
    this.assignment.note = this.note;
    this.assignment.matiere = this.matiere;
    console.log("APRES MODI")
    console.log(this.assignment);
//    this.assignment.rendu= this.rendu;

    this.assignment.dateDeRendu = this.dateDeRendu;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/assignment",this.assignment.id,]);
      })

  }
}
