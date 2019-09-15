import { Component, OnInit, ElementRef } from '@angular/core';
import { FavouriteService } from './favourite.service';
import { Router, NavigationEnd } from '@angular/router';
import { SenderService } from './../sender.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private toast: ToastrService, private formBuilder: FormBuilder, private el: ElementRef, private Send: SenderService, private favlist: FavouriteService, private r: Router, private Cookie: CookieService) { }
  NotFound: Boolean = false;
  NotFound2: Boolean = false;
  DocList: { Id: any, Name: any, PhoneNumber: any, Gender: any, Language: any, Nationality: any, Qualification: any, Specialities: { name: any, Id: any }[], Rating: any, Area: any, IsFav: any, FacilityName: any, DoctorTypeId: any, NextDateTime: any, GetDoctorSlots: { From: any, Date: Date, SlotId: any, DoctorId: any }[], ImageUrl: any, FacilityId: any }[] = [];
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
  DataFav: {
    UserId: any,
    DoctorId: any,
    FacilityId: any,
    IsFav: any,
    SpecialtyId: any
  } = {
      UserId: this.Cookie.get('U_ID'),
      DoctorId: '',
      FacilityId: '',
      IsFav: '',
      SpecialtyId: ''
    };
  DataFavFac: {
    UserId: any,
    FacilityId: any,
    IsFav: any,
  } = {
      UserId: this.Cookie.get('U_ID'),
      FacilityId: '',
      IsFav: ''
    };

  toggleFavDoc(DocId, FacID, SpecID, IsF) {
    this.DataFav.IsFav = false;
    this.DataFav.DoctorId = DocId;
    this.DataFav.FacilityId = FacID;
    this.DataFav.SpecialtyId = SpecID;
    this.favlist.FavouriteDoc(this.DataFav).subscribe((res: any) => {
      if (res) {

        this.toast.success('Deleted from favourite');

        this.ngOnInit();

      }
      else {
        this.toast.error('Something Went Wrong, please try again later :))');

      }
    });
  }
  toggleFavFac(FacID, IsF) {
    this.DataFavFac.IsFav = false;
    this.DataFavFac.FacilityId = FacID;
    this.favlist.FavouriteFac(this.DataFavFac).subscribe((res: any) => {
      if (res) {
        this.toast.success('Deleted from favourite');
        this.ngOnInit();
      }
      else {
        this.toast.error('Something Went Wrong, please try again later :))');

      }
    });
  }

  ngOnInit() {
    this.NotFound = false;
    this.NotFound2 = false;
    this.favlist.GetFavDocs(this.Cookie.get('U_ID')).subscribe((res: any) => {
      this.DocList = res;
      if (this.DocList.length)
        this.NotFound = false;
      else
        this.NotFound = true;
      document.getElementById('loading').style.display = 'none';

    });
    this.favlist.GetFavFacs(this.Cookie.get('U_ID')).subscribe((res: any) => {
      this.HosList = res;
      if (this.HosList.length)
        this.NotFound2 = false;
      else
        this.NotFound2 = true;
      document.getElementById('loading2').style.display = 'none';

    });

  }

}
