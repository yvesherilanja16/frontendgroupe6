import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  message = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email:['', Validators.required],
      roles:['', Validators.required]
  });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("on submit");
    this.submitted = true;

    this.authenticationService.register(this.f.username.value,this.f.email.value,this.f.password.value,[this.f.roles.value]).subscribe(r=>{
      if(r){
        this.message=r.message;
      }
    })

  }
  login= function () {
    this.router.navigate(['/login']);
};

}
