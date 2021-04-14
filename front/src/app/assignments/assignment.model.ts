import { Matiere } from "../matieres/matiere.model";

export class Assignment {
  _id?:string;
  id:number;
  auteur:string;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  matiere:Matiere;
  note:number;
}
