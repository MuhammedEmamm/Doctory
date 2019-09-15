import { CookieService } from 'ngx-cookie-service';
import { SenderService } from './sender.service';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppApiService } from './app-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private Cookie: CookieService, private send: SenderService, public router: Router, private modal: NgbModal, private formBuilder: FormBuilder, private appapi: AppApiService, private toast: ToastrService) {
    if (!this.Cookie.get('U_ID')) {
      this.router.navigateByUrl('/');
    }

  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('SpecsModel') SpecsModel: TemplateRef<any>;
  @ViewChild('CompsModel') CompsModel: TemplateRef<any>;
  @ViewChild('AreasModel') AreasModel: TemplateRef<any>;

  type: any = 'doc';
  Date: any = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
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
  Specs: {
    name: any,
    Id: any,
    ImageUrl: any
  }[] = [];
  Comps: {
    Name: any,
    Id: any,
    ImageUrl: any
  }[] = [];

  Areas: {
    name: any,
    Id: any,
    ImageUrl: any
  }[] = [];

  Spec: {
    name: any,
    id: any
  } = {
      name: 'Pediatric',
      id: '1'
    };
  Comp: {
    name: any,
    id: any
  } = {
      name: ' Insurance ',
      id: ''
    };
  Area: {
    name: any,
    id: any
  } = {
      name: ' Choose Area ',
      id: ''
    };

  UserData: {
    Name: any,
    ID: any
  } = {
      Name: this.Cookie.get('L_N'),
      ID: this.Cookie.get('U_ID')
    };
  Social: {
    "Content": any,
    "Title": any
  }[] = [] ; 
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
  Go() {

    if (this.type == 'doc') {
      this.send.SetData(this.Spec.id, this.Date, this.Date, 1, this.Area.id, this.Comp.id);

      this.router.navigateByUrl('/doctor-list');
    }
    else if (this.type == 'fac') {
      this.send.SetData(this.Spec.id, this.Date, this.Date, 1, this.Area.id, this.Comp.id);
      this.router.navigateByUrl('hospitalslist');
    }
  }
  GetSpecs() {
    this.modal.open(this.SpecsModel, { size: 'sm' });
    document.getElementById('loading').style.display = 'block';

    this.appapi.GetAllSpecs().subscribe((res: any) => {
      this.Specs = res;
      document.getElementById('loading').style.display = 'none';
      this.Specs.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });

    });
  }
  GetComps() {
    this.modal.open(this.CompsModel, { size: 'sm' });
    document.getElementById('loading').style.display = 'block';

    this.appapi.GetAllComps().subscribe((res: any) => {
      this.Comps = res;
      document.getElementById('loading').style.display = 'none';
      this.Comps.sort((a, b) => {
        if (a.Name < b.Name) { return -1; }
        if (a.Name > b.Name) { return 1; }
        return 0;
      });

    });

  }
  GetAreas() {
    this.modal.open(this.AreasModel, { size: 'sm' });
    document.getElementById('loading').style.display = 'block';

    this.appapi.GetAllAreas().subscribe((res: any) => {
      this.Areas = res;
      document.getElementById('loading').style.display = 'none';
      this.Areas.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    });

  }
  CaptureArea(val: any, id: any) {
    this.Area.name = val;
    this.Area.id = id;
    this.modal.dismissAll();

  }
  CaptureSpec(val: any, id: any) {
    this.Spec.name = val;
    this.Spec.id = id;
    this.modal.dismissAll();

  }
  CaptureComp(val: any, id: any) {
    this.Comp.name = val;
    this.Comp.id = id;
    this.modal.dismissAll();
  }
  GetSocial() {
    this.appapi.GetSocial().subscribe((res: any) => {
      this.Social = res;
    }) ; 
  }
  Logout() {
    this.Cookie.deleteAll();
    window.location.reload();
  }

  ngOnInit() {
    this.GetSocial() ;
   }


}
