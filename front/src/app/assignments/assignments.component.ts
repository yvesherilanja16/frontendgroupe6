import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthenticationService } from '../shared/authentication.service';
import { ImageService } from '../shared/image.service';
import { User } from '../_models/user';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignmentsnonrendus:Assignment[];
  assignmentsrendus:Assignment[];
  page1: number=1;
  limit1: number=10;
  totalDocs1: number;
  totalPages1: number;
  hasPrevPage1: boolean;
  prevPage1: number;
  hasNextPage1: boolean;
  nextPage1: number;
  loading1: boolean = false;
  complete1:boolean = false;

  page2: number=1;
  limit2: number=10;
  totalDocs2: number;
  totalPages2: number;
  hasPrevPage2: boolean;
  prevPage2: number;
  hasNextPage2: boolean;
  nextPage2: number;
  loading2: boolean = false;
  complete2:boolean = false;
  user: User;

  miseajour:boolean = false;

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private dialog:MatDialog,
              private imageService:ImageService,
              private router:Router,private authenticationService: AuthenticationService) {
                this.authenticationService.user.subscribe(x => this.user = x);
              }

  ngOnInit() {
    this.user = this.authenticationService.userValue;
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page1 = 1;
      this.limit1 = 10;

      this.getAssignmentsRendus();
      this.getAssignmentsNonRendus();
    });
      console.log("getAssignments() du service appelé");
  }

  onScroll1(event){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if(!this.loading1 && this.complete1){
        this.loadMoreNonRendus()
      }
    }
  }

  onScroll2(event){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if(!this.loading2 && this.complete2){
        this.loadMoreRendus()
      }
    }
  }

  loadMoreNonRendus(){
    this.loading1=true;
    this.assignmentsService.getAssignmentsRendusPagine(false,this.page1 + 1, this.limit1)
    .subscribe(data => {
      data.docs.forEach(agt => {
        if(agt.matiere != undefined && agt.matiere != null){
          agt.matiere.imageProfLien = this.imageService.getImageUrl(agt.matiere.imageProf);
          agt.matiere.imageMatiereLien = this.imageService.getImageUrl(agt.matiere.imageMatiere);
        }
      });
      this.assignmentsnonrendus.push(...data.docs);
      this.page1 = data.page;
      this.limit1 = data.limit;
      this.totalDocs1 = data.totalDocs;
      this.totalPages1 = data.totalPages;
      this.hasPrevPage1 = data.hasPrevPage;
      this.prevPage1 = data.prevPage;
      this.hasNextPage1 = data.hasNextPage;
      this.nextPage1 = data.nextPage;
      console.log("prochaine page");
      this.loading1 = false;
    });
  }

  loadMoreRendus(){
    this.loading2=true;
    this.assignmentsService.getAssignmentsRendusPagine(true,this.page2 + 1, this.limit2)
    .subscribe(data => {
      data.docs.forEach(agt => {
        if(agt.matiere != undefined && agt.matiere != null){
          agt.matiere.imageProfLien = this.imageService.getImageUrl(agt.matiere.imageProf);
          agt.matiere.imageMatiereLien = this.imageService.getImageUrl(agt.matiere.imageMatiere);
        }
      });
      this.assignmentsrendus.push(...data.docs);
      this.page2 = data.page;
      this.limit2 = data.limit;
      this.totalDocs2 = data.totalDocs;
      this.totalPages2 = data.totalPages;
      this.hasPrevPage2 = data.hasPrevPage;
      this.prevPage2 = data.prevPage;
      this.hasNextPage2 = data.hasNextPage;
      this.nextPage2 = data.nextPage;
      console.log("prochaine page");
      this.loading2 = false;
    });
  }

  getAssignmentsNonRendus() {
    this.assignmentsService.getAssignmentsRendusPagine(false,this.page1, this.limit1)
    .subscribe(data => {
      data.docs.forEach(agt => {
        if(agt.matiere != undefined && agt.matiere != null){
          agt.matiere.imageProfLien = this.imageService.getImageUrl(agt.matiere.imageProf);
          agt.matiere.imageMatiereLien = this.imageService.getImageUrl(agt.matiere.imageMatiere);
        }
      });
      this.assignmentsnonrendus = data.docs;
      this.page1 = data.page;
      this.limit1 = data.limit;
      this.totalDocs1 = data.totalDocs;
      this.totalPages1 = data.totalPages;
      this.hasPrevPage1 = data.hasPrevPage;
      this.prevPage1 = data.prevPage;
      this.hasNextPage1 = data.hasNextPage;
      this.nextPage1 = data.nextPage;
      this.complete1=true;
      console.log("données reçues");
    });
  }

  getAssignmentsRendus() {
    this.assignmentsService.getAssignmentsRendusPagine(true,this.page2, this.limit2)
    .subscribe(data => {
      data.docs.forEach(agt => {
        if(agt.matiere != undefined && agt.matiere != null){
          agt.matiere.imageProfLien = this.imageService.getImageUrl(agt.matiere.imageProf);
          agt.matiere.imageMatiereLien = this.imageService.getImageUrl(agt.matiere.imageMatiere);
        }
      });
      this.assignmentsrendus = data.docs;
      this.page2 = data.page;
      this.limit2 = data.limit;
      this.totalDocs2 = data.totalDocs;
      this.totalPages2 = data.totalPages;
      this.hasPrevPage2 = data.hasPrevPage;
      this.prevPage2 = data.prevPage;
      this.hasNextPage2 = data.hasNextPage;
      this.nextPage2 = data.nextPage;
      this.complete2 = true;
      console.log("données reçues");
    });
  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }


    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        let elem = event.container.data[event.previousIndex];
        event.container.data.splice(event.previousIndex, 1);
        event.container.data.splice(event.currentIndex, 0, elem);
      } else {
        let elem = event.previousContainer.data[event.previousIndex];
        event.previousContainer.data.splice(event.previousIndex, 1);
        event.container.data.splice(event.currentIndex, 0, elem);
        if(<unknown>event.previousContainer.data === this.assignmentsnonrendus){
          this.rendreDevoir(elem);
        } else {
          this.unrendreDevoir(elem);
        }
      }
    }

    rendreDevoir(assignment:any){
      console.log("Rendu de l'assignment :"+ assignment.nom);
      assignment.rendu = true;
      this.mettreAJour(assignment);
    }

    unrendreDevoir(assignment:any){
      console.log("Marquer comme non rendu l'assignment :"+ assignment.nom);
      assignment.rendu = false;
      this.mettreAJour(assignment);
    }

    mettreAJour(assignment:any){
      this.miseajour = true;
      this.openDialog();
      this.assignmentsService.updateAssignment(assignment).subscribe((res)=>{
        this.closeDialog();
        this.miseajour = false;
      })
    }

    closeDialog(){
      this.dialog.closeAll();
    }

    openDialog() {
      const dialogRef = this.dialog.open(MoreAssignmentLoadingDialog,{disableClose:true});
    }

    voirdetails(id:string){
      this.router.navigate(["/assignment",id])
    }

}


@Component({
  selector: 'more-assignment-loading-dialog',
  templateUrl: 'more-assignment-loading-dialog.html',
})
export class MoreAssignmentLoadingDialog {}