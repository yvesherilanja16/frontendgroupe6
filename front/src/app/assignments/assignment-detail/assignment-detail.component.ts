import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ImageService } from 'src/app/shared/image.service';
import { User } from 'src/app/_models/user';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;
  user: User;

  constructor(
    private assignmentsService: AssignmentsService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  
  ) {
    this.authenticationService.user.subscribe(x => {
      this.user = x; 
      console.log("User subscribe done");
    });
  
  }

  ngOnInit(): void {
    this.getAssignmentById();
    this.user = this.authenticationService.userValue;
    console.log("user value");
    console.log(this.user);
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
      this.assignmentTransmis.matiere.imageProfLien = this.imageService.getImageUrl(this.assignmentTransmis.matiere.imageProf);
      this.assignmentTransmis.matiere.imageMatiereLien = this.imageService.getImageUrl(this.assignmentTransmis.matiere.imageMatiere);
    });
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });

    //this.assignmentTransmis = null;
  }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: {
        nom:'Michel Buffa',
        metier:"Professeur",
        responsable:"MIAGE"
      },
      fragment:"edition"
    });
  }

  isAdmin() {
    //return this.authService.admin;
    return true;
  }
}
