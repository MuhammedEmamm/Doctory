import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from './forget-password.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private Cookie: CookieService, private forget: ForgetPasswordService, private router: Router, private toast: ToastrService, private formBuilder: FormBuilder, private modal: NgbModal) { }
  @ViewChild('ResetPasswordModel') ResetPasswordModel: TemplateRef<any>;

  ForgetPasswordForm: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
  });

  ResetPasswordForm: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    VerfiyCode: ['', Validators.required],
    NewPassword: ['', Validators.required]
  });
  submitted = false;
  submitted2 = false;

  get f() { return this.ForgetPasswordForm.controls; }
  get s() { return this.ResetPasswordForm.controls; }

  ForgetPassword() {
    this.submitted = true;
    if (this.ForgetPasswordForm.invalid) {
      return;
    }
    this.forget.ForgetPassword(this.ForgetPasswordForm.value).subscribe((res: any) => {
      if (res) {

        this.toast.success('Verification Code Sent Successfully, Please Check Your Email :) ');
        this.modal.open(this.ResetPasswordModel, { size: 'lg' });
        this.ForgetPasswordForm.reset();
        this.submitted = false;
      }
      else {
        this.ForgetPasswordForm.reset();
        this.toast.error('Something Went Wrong, Please try again later');
      }
    });
  }
  ResetPassword() {
    this.submitted2 = true;
    if (this.ResetPasswordForm.invalid) {
      return;
    }
    this.forget.ResetPassword(this.ResetPasswordForm.value).subscribe((res: any) => {
      this.submitted2 = false;
      if (res) {
        this.ResetPasswordForm.reset();
        this.modal.dismissAll() ;
        this.toast.success('Password Changed Successfully');
        this.router.navigateByUrl('/login');
      }
      else {
        this.ResetPasswordForm.reset();
        this.toast.error('Something Went Wrong, Please try again later :)');
        this.modal.dismissAll() ;

      }
    });
  }
  ngOnInit() {
  }

}
