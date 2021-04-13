import { Injectable } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { ImageService } from './image.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Matiere } from '../matieres/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  uri = environment.backendUri+"/matieres";

  constructor(private imageService:ImageService, private http:HttpClient) { }

  private generateId(){
    return "mat_"+Date.now();
  }

  getMatiere(id:string){
    
  }

  addMatiere(matiere:Matiere, imageProfFile: File = null, imageMatiereFile: File = null):Observable<any> {
    matiere.id = this.generateId();
    console.log("HERE");
    return combineLatest([
      this.imageService.convertImage(imageProfFile),
      this.imageService.convertImage(imageMatiereFile)
    ]).pipe(
      take(1),
      map((images)=>{
        console.log("MAP")
        matiere.imageProf = images[0];
        matiere.imageMatiere = images[1];
        return matiere;
      })
      ).pipe(
        switchMap((matiere:any) => 
        this.http.post(this.uri, matiere).pipe(
          map((res)=> ({result:res, matiere}))
        )
        )
      );
  }
}
