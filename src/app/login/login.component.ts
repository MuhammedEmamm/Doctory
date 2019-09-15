import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private Cookie: CookieService, private login: LoginService, private router: Router, private toast: ToastrService, private formBuilder: FormBuilder) {
    if (this.Cookie.get('U_ID')) {
      this.router.navigateByUrl('/');
    }

  }

  LoginForm: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],

  });
  submitted = false;
  Loading = false ; 

  get f() { return this.LoginForm.controls; }

  SignInform() {
    this.submitted = true;
    this.Loading = true ; 
    if (this.LoginForm.invalid) {
      this.Loading = false ; 
      return;
    }
    document.getElementById('loading').style.display = 'block' ; 

    this.login.Signin(this.LoginForm.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Logged In Successfully');
        this.LoginForm.reset();
        this.submitted = false;
        this.Loading = false ; 
        this.Cookie.set('U_ID', res.Id);
        this.Cookie.set('L_N', res.FirstName);
        this.Cookie.set('C_N', res.CprNumber);
        this.Cookie.set('M_N' , res.MobileNumber) ; 
        document.getElementById('loading').style.display = 'none' ; 
    
        window.location.reload();
      }
      else {
        this.toast.error('InValid Email or Password');
        document.getElementById('loading').style.display = 'none' ; 
        this.submitted = false;
        this.Loading = false ; 
        this.LoginForm.patchValue({
          Passowrd: ''
        });

      }

    });
  }

  ngOnInit() {

  }

}
