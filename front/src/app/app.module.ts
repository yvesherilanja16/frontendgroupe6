
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { Role } from './_models/role';
import { RegisterComponent } from './register/register.component';
//import { RegisterComponent } from './register/register.component';
//import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { MatieresComponent } from './matieres/matieres.component';
import { MatiereDetailComponent } from './matieres/matiere-detail/matiere-detail.component';
import { EditMatiereComponent } from './matieres/edit-matiere/edit-matiere.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component:LoginComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"add",
    component:AddAssignmentComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Eleve] }
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent,
//    canActivate : [AuthGuard]
  },
  {
    path:"images/add",
    component:ImageuploadComponent  
  },
  {
    path:"matiere",
    component:MatieresComponent  
  },
  {
    path:"matiere/add",
    component:AddMatiereComponent
  },
  {
    path:"matiere/:id",
    component:MatiereDetailComponent
  },
  {
    path:"matiere/:id/edit",
    component:EditMatiereComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent,
    RegisterComponent,
    //RegisterComponent
    AddMatiereComponent,
    EditAssigmentComponent,
    MatiereDetailComponent,
    MatieresComponent,
    EditMatiereComponent,
    ImageuploadComponent,
    MatieresComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
