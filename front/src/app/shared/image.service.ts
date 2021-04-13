import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  uri = environment.backendUri+"/images";

  constructor(private http:HttpClient) {

  }

  private getBase64(file:File){
    return new Observable((observer)=>{
      console.log("GetBase64");
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=> observer.next(reader.result);
      reader.onerror = () => observer.error(reader.error);
    });
  }

  addImage(file: File){
      return this.convertImage(file).pipe(
        switchMap((filedata : any) =>
          this.http.post(this.uri, filedata).pipe(
            map((msg) => ({
              httpData:msg,
              image:filedata
            }))
          )
        )
      )
  }

  convertImage(file: File){
    console.log("call convert image");
    console.log(file);
    if(file == null){
      return of(null);
    }

    let id = "img_"+Date.now();
    let nom = file.name;
    let type = file.type;
    return this.getBase64(file).pipe(
      map((filedata : any) => {
         console.log("map inside convert imge")
        return { id,nom,type,data:filedata};
        })
      )
    } 

}
