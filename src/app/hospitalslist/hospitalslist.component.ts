import { HospitalListService } from './hospital-list.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { SenderService } from './../sender.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospitalslist',
  templateUrl: './hospitalslist.component.html',
  styleUrls: ['./hospitalslist.component.css']
})
export class HospitalslistComponent implements OnInit {
  constructor(private toast: ToastrService, private formBuilder: FormBuilder, private el: ElementRef, private Send: SenderService, private hoslist: HospitalListService, private r: Router, private Cookie: CookieService) {
    this.r.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  Page: any = 1;
  FacType: any = '';
  InsuranceId: any = '';
  AreaId: any = '';
  NotFound: Boolean = false;

  Data: {
    SpecialtyId: any,
    fromDate: Date,
    toDate: Date,
    pageNumber: any,
    AreaId: any,
    InsuranceId: any
  } = {
      SpecialtyId: '',
      fromDate: new Date(),
      toDate: new Date(),
      pageNumber: '',
      AreaId: '',
      InsuranceId: ''
    };

  HosList: {
    Name: any,
    Address: any,
    ContactNumber: any,
    DoctorTypeId: any,
    FacilitySpecialities: { name: any, Id: any, ImageUrl: any, Rank: any }[],
    Id: any,
    ImageUrl: any,
    IsFavorite: any,
    Location: any,
    WebSite: any
  }[] = [];
  
  Comps: { Name: any, Id: any, }[] = [];
  Areas: { name: any, Id: any, ImageUrl: any }[] = [];
  FacTypes: { name: any, Id: any, ImageUrl: any }[] = [];
  Long: any;
  Lat: any;
  DataFav: {
    UserId: any,
    FacilityId: any,
    IsFav: any,
  } = {
      UserId: this.Cookie.get('U_ID'),
      FacilityId: '',
      IsFav: ''
    };
    
  Top() {
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  Filter() {
    this.HosList = [];
    this.NotFound = false; 
    let userID = this.Cookie.get('U_ID');
    if (!userID)
      userID = '0';
    document.getElementById('loading').style.display = 'block';
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
    this.hoslist.GetFacs(this.Data.SpecialtyId, this.InsuranceId, this.AreaId, userID, this.FacType).subscribe((res: any) => {
      this.HosList = res;
      this.Page = 1;
      if(this.HosList.length)
      this.NotFound=  false ; 
      else 
      this.NotFound = true ; 
      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';


    });
  }
  toggleFav(FacID, IsF) {
    this.DataFav.IsFav = !IsF;
    this.DataFav.FacilityId = FacID;
    this.hoslist.Favourite(this.DataFav).subscribe((res: any) => {
      if (res) {
        if (this.DataFav.IsFav)
          this.toast.success('Added to favourite');
        else
          this.toast.success('Deleted from favourite');
        this.Filter();
      }
      else {
        this.toast.error('Something Went Wrong, please try again later :))');

      }
    });
  }


  ngOnInit() {
    this.Data = this.Send.GetData();
    let userID = this.Cookie.get('U_ID');
    if (!userID)
      userID = '0';
    this.AreaId = this.Data.AreaId;
    this.InsuranceId = this.Data.InsuranceId;
    this.NotFound = false; 

    this.hoslist.GetFacs(this.Data.SpecialtyId, this.Data.InsuranceId, this.Data.AreaId, userID, '').subscribe((res: any) => {
      this.HosList = res;
      this.Page = 1;
      if(this.HosList.length)
      this.NotFound=  false ; 
      else 
      this.NotFound = true ; 
      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';

    });
    this.hoslist.GetFacsTypes().subscribe((res: any) => {
      this.FacTypes = res;
    });
    this.hoslist.GetAllComps().subscribe((res: any) => {
      this.Comps = res;
    });
    this.hoslist.GetAllAreas().subscribe((res: any) => {
      this.Areas = res;
    });

  }

}
