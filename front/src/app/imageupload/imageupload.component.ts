import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Matiere } from '../matieres/matiere.model';
import { ImageService } from '../shared/image.service';
import { MatieresService} from '../shared/matieres.service';

// this is component to test file upload functionality, from within Matiere

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  imageProfFile: File = null;
  imageMatiereFile: File = null;
  nom:string = "";
  prof:string = "";

  constructor( private matiereService:MatieresService) { }

  ngOnInit(): void {
  }

  handleImageProfInput(files: FileList){
    this.imageProfFile = files.item(0);
  }

  handleImageMatiereFileInput(files: FileList){
    this.imageMatiereFile = files.item(0);
  }

  uploadImage(){
    let matiere = new Matiere();
    matiere.nom = this.nom;
    matiere.prof = this.prof;
    this.matiereService.addMatiere(matiere, this.imageProfFile,this.imageMatiereFile).subscribe((resp)=>{
      console.log(resp);
    })
  }

}
