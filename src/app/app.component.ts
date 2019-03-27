import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppApiService } from './app-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  public type: any;
  Contactusform: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    PhoneNumber: ['', Validators.required],
    Content: ['', Validators.required]
  });
  submitted = false;
  formData: {
    "Email": any,
    "PhoneNumber": any,
    "Content": any
  } = { Email: '', PhoneNumber: '', Content: '' };
  constructor(public router: Router, private modal: NgbModal, private formBuilder: FormBuilder, private appapi: AppApiService, private toast: ToastrService) { }
  Go() {
    if (this.type == 'doc')
      this.router.navigateByUrl('/doctor-list');
    else if (this.type == 'fac')
      this.router.navigateByUrl('hospitalslist');
    else
      this.router.navigateByUrl('/');

  }
  OpenContactForm() {
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  get f() { return this.Contactusform.controls; }

  ContactUs() {
    this.submitted = true;
    if (this.Contactusform.invalid) {
      return;
    }
    this.appapi.GetContactUs(this.Contactusform.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Your Message Sent Successfully');
        this.modal.dismissAll();
        this.Contactusform.reset();
        this.submitted = false;
      }

    });
  }

}
