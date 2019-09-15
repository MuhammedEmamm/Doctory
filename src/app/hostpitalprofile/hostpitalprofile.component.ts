import { Component, OnInit, ElementRef } from '@angular/core';
import { HospitalProfileService } from './hospital-profile.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SenderService } from './../sender.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hostpitalprofile',
  templateUrl: './hostpitalprofile.component.html',
  styleUrls: ['./hostpitalprofile.component.css']
})
export class HostpitalprofileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private el: ElementRef, private Send: SenderService, private hospro: HospitalProfileService, private r: Router, private Cookie: CookieService) { }
  UserID = this.Cookie.get('U_ID');
  FacID = this.route.snapshot.paramMap.get('FacID');
  Spec: any;
  FacDetails: {
    Name: any,
    Id: any,
    Email: any,
    FacilityId: any,
    FacilityInfo: any,
    FacilityLocation: any,
    FacilityName: any,
    FacilityType: any,
    FacilityTypeId: any,
    GeneralInfo: any,
    IsFav: any,
    Info: any,
    Qualification: any,
    FacilitySpecialities: { name: any, Id: any, ImageUrl: any }[],
    InsuranceCompanies: { Name: any, Id: any, ImageUrl: any }[],
    ImageUrl: any,
    Images: any[]
    ContactNumber: any,
    Area: any,
    DoctorTypeId: any;
    Reviews: any[],
    Address: any,
    Location: any,
    Doctors: {
      Id: any,
      Name: any,
      Qualification: any,
      ImageUrl: any,
      DoctorTypeId: any,
      Specialities: { name: any, Id: any, ImageUrl: any }[]
    }[] , 
    Services:any
  } = {
      Name: '',
      Id: '',
      Email: '',
      FacilityId: '',
      FacilityInfo: '',
      FacilityLocation: '',
      FacilityName: '',
      FacilityType: '',
      FacilityTypeId: '',
      GeneralInfo: '',
      IsFav: '',
      Info: '',
      Qualification: '',
      FacilitySpecialities: [],
      InsuranceCompanies: [],
      ImageUrl: '',
      Images: [],
      ContactNumber: '',
      Area: '',
      DoctorTypeId: '',
      Reviews: [],
      Address: '',
      Location: '',
      Doctors: [],
      Services:''
    };
  FacDocs: {
    Id: any,
    ImageUrl: any,
    DoctorTypeId: any,
    Qualification: any,
    Name: any,
    Specialities: { name: any, Id: any, ImageUrl: any }[]

  }[] = [] ; 
  Long: number = 50.5758285;
  Lat: number = 26.2116501;
  DocsFilter(SpecID: any) {
    this.Spec = SpecID ; 
    this.FacDocs = this.FacDetails.Doctors.filter(it => it['Specialities'].filter(id => id['Id'].toString() == SpecID.toString()).length != 0);
    let e = this.el.nativeElement.querySelector('#docs');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  ngOnInit() {
    this.hospro.GetFacDetails(this.FacID, this.UserID).subscribe((res: any) => {
      this.FacDetails = res;
      console.log(this.FacDetails) ; 
      document.getElementById('page-loader').style.display = 'none';
      this.FacDocs = this.FacDetails.Doctors.map(it => ({
        Id: it['Id'], ImageUrl: it['ImageUrl'], DoctorTypeId: it['DoctorTypeId'], Qualification: it['Qualification'], Name: it['Name'],
        Specialities: it['Specialities']
      }));
      this.Spec = this.Send.GetData().SpecialtyId;
      this.FacDocs = this.FacDetails.Doctors.filter(it => it['Specialities'].filter(id => id['Id'].toString() == this.Spec.toString()).length != 0);
      this.Lat = this.FacDetails.Location.split(',')[0];
      this.Long = this.FacDetails.Location.split(',')[1];
    });
  }

}
