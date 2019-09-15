import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisetrationService } from './regisetration.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [RegisetrationService]
})
export class SignupComponent implements OnInit {
  constructor(private Register: RegisetrationService, private toast: ToastrService, private formBuilder: FormBuilder, private router: Router, private Cookie: CookieService) {
    if (this.Cookie.get('U_ID')) {
      this.router.navigateByUrl('/');
    }

  }
  Codes: { name: any, code: any }[] = [
    { name: 'SA', code: '+966' } , 
    { name: 'YE', code: '+967' } , 
    { name: 'AE', code: '+971' } , 
    { name: 'KW', code: '+965' } , 
    { name: 'QA', code: '+974' } , 
    { name: 'OM', code: '+968' } , 
    { name: 'BH', code: '+973' } , 
    { name: 'SY', code: '+963' } , 
    { name: 'IQ', code: '+964' } , 
    { name: 'PS', code: '+970' } , 
    { name: 'LB', code: '+961' } , 
    { name: 'JO', code: '+962' } , 
    { name: 'EG', code: '+20' } , 
    { name: 'MA', code: '+212' } , 
    { name: 'TN', code: '+216' } , 
    { name: 'DZ', code: '+213' } , 
    { name: 'LY', code: '+218' } , 
    { name: 'SD', code: '+249' } , 
    { name: 'MR', code: '+222' } , 
    { name: 'SO', code: '+252' } , 
    { name: 'DJ', code: '+253' } , 
    { name: 'KM', code: '+269' } ,
  ] ; 
  
  Image: any = 'assets/images/user.png';
  Code:any = '+966';
  Registerform: FormGroup = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    DOB: ['', Validators.required],
    Gender: ['', Validators.required],
    MobileNumber: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
    Image: [''],
    CprNumber: ['']
  });
  submitted = false;
  Loading = false ; 
  get f() { return this.Registerform.controls; }

  SignUpform() {
    this.submitted = true;
    this.Loading = true ; 
    console.log(this.Registerform.controls);
    if (this.Registerform.invalid) {
      this.Loading = false; 
      return;
    }
    this.Registerform.patchValue({
      MobileNumber : this.Code +'-'+this.Registerform.value.MobileNumber
    }) ; 
    document.getElementById('loading').style.display = 'block' ; 


    this.Register.SignUp(this.Registerform.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Registered Successfully');
        this.Registerform.reset();
        this.submitted = false;
        this.Loading = false; 

        this.router.navigateByUrl('/login');
        document.getElementById('loading').style.display = 'none' ; 

      }
      else{
        document.getElementById('loading').style.display = 'none' ; 
        this.toast.error('Something Went Wrong, please try again later :)');
        this.submitted = false;
        this.Loading = false; 


      }

    });
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.Register.UploadImg(input).subscribe((res: any) => {
      console.log(res);
      this.Registerform.patchValue({
        Image: res
      });
      this.Image = res;
      this.Image = 'http://docpoc.co/DoctoryBackEnd/' + res;

    });

  }
  
  ngOnInit() {

  }

}
