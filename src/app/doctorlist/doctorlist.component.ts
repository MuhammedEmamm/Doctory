import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { DoclistService } from './doclist.service';
import { SenderService } from './../sender.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctorlist',
  providers: [DoclistService],
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  constructor(private toast: ToastrService, private formBuilder: FormBuilder, private el: ElementRef, private Send: SenderService, private doclist: DoclistService, private r: Router, private Cookie: CookieService) {
    this.r.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  LangID: any = '';
  NationalityId: any = '';
  QualificationId: any = '';
  InsuranceId: any = '';
  AreaId: any = '';
  gender: any = '';

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
  Page: any = 1;
  SlotDate: Date;
  SlotDate2: Date;
  SlotDate3: Date;

  today: Date;
  tomorrow: Date;
  aftertomorrow: Date;
  DocList: { Id: any, Name: any, PhoneNumber: any, Gender: any, Language: any, Nationality: any, Qualification: any, Specialities: { name: any, Id: any }[], Rating: any, Area: any, IsFav: any, FacilityName: any, DoctorTypeId: any, NextDateTime: any, GetDoctorSlots: { From: any, Date: Date, SlotId: any, DoctorId: any }[], ImageUrl: any, FacilityId: any }[] = [];

  Slots: Object[][] = [[]];
  SlotsMob: Object[] = [];
  NotFound: Boolean = false;
  AllLangs: { name: any, Id: any }[] = [];
  AllNats: { name: any, Id: any }[] = [];
  AllQuals: { name: any, Id: any }[] = [];
  Comps: { Name: any, Id: any, }[] = [];
  Areas: { name: any, Id: any, ImageUrl: any }[] = [];

  Months: { "Day": any, "Date": any, "FullDate": any }[] = [];
  Monthsmob: { "Day": any, "Date": any, "FullDate": any }[] = [];

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthindex = 0;
  monthindexmob = 0;
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

  calendar() {
    this.Months = [];
    this.today = new Date(this.Data.fromDate);
    this.tomorrow = new Date(this.Data.fromDate);
    this.aftertomorrow = new Date(this.Data.fromDate);
    this.SlotDate = this.today;
    this.Months.push({ "Day": `${this.days[this.today.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.today.getMonth()].substr(0, 3)} ${this.today.getDate()}`, "FullDate": this.today });
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.Months.push({ "Day": `${this.days[this.tomorrow.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.tomorrow.getMonth()].substr(0, 3)} ${this.tomorrow.getDate()}`, "FullDate": this.tomorrow });
    this.SlotDate2 = this.Months[this.monthindex + 1].FullDate;
    this.aftertomorrow.setDate(this.tomorrow.getDate() + 1);
    this.Months.push({ "Day": `${this.days[this.aftertomorrow.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.aftertomorrow.getMonth()].substr(0, 3)} ${this.aftertomorrow.getDate()}`, "FullDate": this.aftertomorrow });
    this.SlotDate3 = this.Months[this.monthindex + 2].FullDate;


  }
  calendarmob() {
    this.Monthsmob = [];
    this.today = new Date(this.Data.fromDate);
    this.SlotDate = this.today;
    this.Monthsmob.push({ "Day": `${this.days[this.today.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.today.getMonth()].substr(0, 3)} ${this.today.getDate()}`, "FullDate": this.today });

  }
  slidecalendarnext() {
    this.today = new Date(this.Months[this.monthindex + 2].FullDate);
    this.tomorrow = new Date(this.Months[this.monthindex + 2].FullDate);
    this.aftertomorrow = new Date(this.Months[this.monthindex + 2].FullDate);
    this.SlotDate = this.today;
    this.today.setDate(this.today.getDate() + 1);
    this.Months.push({ "Day": `${this.days[this.today.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.today.getMonth()].substr(0, 3)} ${this.today.getDate()}`, FullDate: this.today });

    this.tomorrow.setDate(this.tomorrow.getDate() + 2);
    this.SlotDate2 = this.tomorrow;
    this.Months.push({ "Day": `${this.days[this.tomorrow.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.tomorrow.getMonth()].substr(0, 3)} ${this.tomorrow.getDate()}`, FullDate: this.tomorrow });
    this.aftertomorrow.setDate(this.aftertomorrow.getDate() + 3);
    this.SlotDate3 = this.aftertomorrow;
    this.Months.push({ "Day": `${this.days[this.aftertomorrow.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.aftertomorrow.getMonth()].substr(0, 3)} ${this.aftertomorrow.getDate()}`, FullDate: this.aftertomorrow });
    this.monthindex += 3;
    this.GetDoctorsByDate(this.SlotDate);
  }
  slidecalendarprev() {
    if (this.monthindex !== 0) {
      this.Months.pop();
      this.Months.pop();
      this.Months.pop();
      this.monthindex -= 3;
      this.SlotDate = this.Months[this.monthindex].FullDate;
      this.SlotDate2 = this.Months[this.monthindex + 1].FullDate;
      this.SlotDate3 = this.Months[this.monthindex + 2].FullDate;
      this.GetDoctorsByDate(this.SlotDate);


    }

  }
  slidecalendarprevmob() {
    if (this.monthindexmob !== 0) {
      this.Monthsmob.pop();
      this.monthindexmob--;
      this.SlotDate = this.Monthsmob[this.monthindexmob].FullDate;
      this.GetDoctorsByDate(this.SlotDate);

    }
  }
  slidecalendarnextmob() {
    this.today = new Date(this.Monthsmob[this.monthindexmob].FullDate);
    this.SlotDate = this.today;
    this.today.setDate(this.today.getDate() + 1);
    this.Monthsmob.push({ "Day": `${this.days[this.today.getDay()].substr(0, 3)}`, "Date": `${this.monthNames[this.today.getMonth()].substr(0, 3)} ${this.today.getDate()}`, FullDate: this.today });
    this.monthindexmob++;
    this.GetDoctorsByDate(this.SlotDate);

  }
  Top() {
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  Filter() {
    this.DocList = [];
    this.NotFound = false; 
    this.Data = this.Send.GetData();
    let today = new Date(this.SlotDate);
    let tomorrow = new Date(this.SlotDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let userID = this.Cookie.get('U_ID');
    if (!userID)
      userID = '0';
    document.getElementById('loading').style.display = 'block';
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
    this.doclist.GetDocs(this.Data.SpecialtyId, (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear(), (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate() + '-' + tomorrow.getFullYear(), this.InsuranceId, this.AreaId, userID, this.NationalityId, this.QualificationId, this.LangID, this.gender).subscribe((res: any) => {
      this.DocList = res;
      if(this.DocList.length)
      this.NotFound=  false ; 
      else 
      this.NotFound = true ; 
      
      this.Page = 1;
      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';

    });
  }
  copyPhoneNumber(Phone: any) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = Phone
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toast.success('Phone Number Copied Successfully');
  }
  GetDoctorsByDate(date: any) {
    this.DocList = [];
    this.NotFound = false; 

    this.Data = this.Send.GetData();
    let today = new Date(date);
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let userID = this.Cookie.get('U_ID');
    if (!userID)
      userID = '0';
    document.getElementById('loading').style.display = 'block';
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
    this.doclist.GetDocs(this.Data.SpecialtyId, (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear(), (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate() + '-' + tomorrow.getFullYear(), this.InsuranceId, this.AreaId, userID, this.NationalityId, this.QualificationId, this.LangID, this.gender).subscribe((res: any) => {
      this.DocList = res;
      this.Page = 1;
      if(this.DocList.length)
      this.NotFound=  false ; 
      else 
      this.NotFound = true ; 

      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';

    });
  }
  
  toggleFav(DocId, FacID, SpecID, IsF) {
    this.DataFav.IsFav = !IsF;
    this.DataFav.DoctorId = DocId;
    this.DataFav.FacilityId = FacID;
    this.DataFav.SpecialtyId = SpecID;
    this.doclist.Favourite(this.DataFav).subscribe((res: any) => {
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
    this.calendar();
    this.calendarmob();
    this.Data = this.Send.GetData();
    let today = new Date(this.Data.fromDate);
    let tomorrow = new Date(this.Data.toDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let userID = this.Cookie.get('U_ID');
    if (!userID)
      userID = '0';
    this.InsuranceId = this.Data.InsuranceId;
    this.AreaId = this.Data.AreaId;
    this.NotFound = false; 
    this.doclist.GetDocs(this.Data.SpecialtyId, (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear(), (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate() + '-' + tomorrow.getFullYear(), this.Data.InsuranceId, this.Data.AreaId, userID, '', '', '', '').subscribe((res: any) => {
      this.DocList = res;
      this.Page = 1;
      if(this.DocList.length)
      this.NotFound=  false ; 
      else 
      this.NotFound = true ; 

      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';

    });
    this.doclist.GetAllAreas().subscribe((res: any) => {
      this.Areas = res;
    });
    this.doclist.GetAllComps().subscribe((res: any) => {
      this.Comps = res;
    });
    this.doclist.GetLanguages().subscribe((res: any) => {
      this.AllLangs = res;
    });
    this.doclist.GetNationalities().subscribe((res: any) => {
      this.AllNats = res;
    });
    this.doclist.GetQualifications().subscribe((res: any) => {
      this.AllQuals = res;
    });

  }

}
