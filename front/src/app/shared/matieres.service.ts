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

  getMatieres():Observable<Matiere[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Matiere[]>(this.uri);
  }

  getMatieresPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(`${this.uri}?page=${page}&limit=${limit}`);
  }

  getMatiere(id:string):Observable<Matiere>{
    return this.http.get<Matiere>(`${this.uri}/${id}`,)
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
  updateMatiere(matiere:Matiere, imageProfFile: File = null, imageMatiereFile: File = null):Observable<any> {
    matiere.id = this.generateId();
    console.log("HERE");
    return combineLatest([
      this.imageService.convertImage(imageProfFile),
      this.imageService.convertImage(imageMatiereFile)
    ]).pipe(
      take(1),
      map((images)=>{
        console.log("MAP")
        if(images[0] != null){
          matiere.imageProf = images[0];
        }
        if(images[0] != null){
          matiere.imageMatiere = images[1];
        }
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
