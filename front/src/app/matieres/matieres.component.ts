import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from '../shared/matieres.service';
import { Matiere } from './matiere.model';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {

  matieres:Matiere[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  constructor(private matiereService:MatieresService,
                  private route:ActivatedRoute,
                private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getMatieres();
    });
  }

  getMatieres() {
    this.matiereService.getMatieresPagine(this.page, this.limit)
    .subscribe(data => {
      this.matieres = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
      console.log(this.matieres);
    });
  }

}
