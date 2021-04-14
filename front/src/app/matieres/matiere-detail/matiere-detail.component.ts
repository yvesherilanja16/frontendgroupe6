import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from '../matiere.model';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-matiere-detail',
  templateUrl: './matiere-detail.component.html',
  styleUrls: ['./matiere-detail.component.css'],
})
export class MatiereDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  matiere: Matiere;

  constructor(
    private matieresService: MatieresService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getMatiereById();
  }

  getMatiereById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: string = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.matieresService.getMatiere(id).subscribe((matiere) => {
      this.matiere = matiere;
      matiere.imageProfLien = this.imageService.getImageUrl(this.matiere.imageProf);
      matiere.imageMatiereLien = this.imageService.getImageUrl(this.matiere.imageMatiere);
    });
  }

  onClickEdit() {
    this.router.navigate(['/matiere', this.matiere.id, 'edit']);
  }

  onClickDelete(){
    const id: string = this.route.snapshot.params.id;
    this.matieresService.deleteMatiere(id).subscribe((_)=>{
      this.router.navigate(['/matiere']);
    });
  }

  isAdmin() {
   // return this.authService.admin;
   return true;
  }
}
