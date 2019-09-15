import { ToastrService } from 'ngx-toastr';
import { DoctorProfileService } from './doctor-profile.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { SenderService } from './../sender.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  constructor(private toast: ToastrService, private route: ActivatedRoute, private formBuilder: FormBuilder, private el: ElementRef, private Send: SenderService, private docpro: DoctorProfileService, private r: Router, private Cookie: CookieService) { }


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

  UserID = this.Cookie.get('U_ID');
  FacID = this.route.snapshot.paramMap.get('FacID');
  DocID = this.route.snapshot.paramMap.get('DocID');
  SlotID = this.route.snapshot.paramMap.get('SlotID');
  Date: Date = new Date(this.route.snapshot.paramMap.get('Date'));
  CprN = this.Cookie.get('C_N');
  MopN = this.Cookie.get('M_N');
  submitted = false;
  submitted2 = false;
  Loading1 = false;
  Loading2 = false;

  SlotDate: Date;
  SlotDate2: Date;
  SlotDate3: Date;

  today: Date;
  tomorrow: Date;
  aftertomorrow: Date;
  Slots: Object[][] = [[]];
  SlotsMob: Object[] = [];
  Months: { "Day": any, "Date": any, "FullDate": any }[] = [];
  Monthsmob: { "Day": any, "Date": any, "FullDate": any }[] = [];

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthindex = 0;
  monthindexmob = 0;
  DocList: { Id: any, Name: any, PhoneNumber: any, Gender: any, Language: any, Nationality: any, Qualification: any, Specialities: { name: any, Id: any }[], Rating: any, Area: any, IsFav: any, FacilityName: any, DoctorTypeId: any, NextDateTime: any, GetDoctorSlots: { From: any, Date: Date, SlotId: any, DoctorId: any }[], ImageUrl: any, FacilityId: any }[] = [];
  PP = this.UserID;

  RequestAppForm: FormGroup = this.formBuilder.group({
    PatientId: ['', Validators.required],
    ContactNumber: ['', Validators.required],
    FacilityId: ['', Validators.required],
    SpecialtyId: ['', Validators.required],
    DoctorId: ['', Validators.required],
    DateTime: ['', Validators.required],
    PromoCode: [''],
    Time: ['', Validators.required],
    RequestType: ['', Validators.required],
    CPRNumber: ['']
  });
  RequestAppSchForm: FormGroup = this.formBuilder.group({
    PatientId: ['', Validators.required],
    DoctorId: ['', Validators.required],
    SlotId: ['', Validators.required],
    PromoCode: [''],
    RequestType: ['', Validators.required],
    CPRNumber: [''],
    Date: ['', Validators.required],
    ContactNumber: ['', Validators.required]
  });
  DocDetails: {
    Name: any,
    Id: any,
    Email: any,
    FacilityId: any,
    FacilityInfo: any,
    FacilityLocation: any,
    FacilityName: any,
    Gender: any,
    IsFav: any,
    Info: any,
    Qualification: any,
    Specialities: { name: any, Id: any }[],
    ImageUrl: any,
    ContactNumber: any,
    Area: any,
    DoctorTypeId: any;
    Reviews: any[],
    Address: any,
    ClinicInfo: any,
    GetDoctorSlots: {
      SlotId: any,
      Date: any,
      From: any,
      DoctorId: any
    }[]
  } = {
      Name: '',
      Id: '',
      Email: '',
      FacilityId: '',
      FacilityInfo: '',
      FacilityLocation: '',
      FacilityName: '',
      Gender: '',
      IsFav: '',
      Info: '',
      Qualification: '',
      Specialities: [{ name: '', Id: '' }],
      ImageUrl: '',
      ContactNumber: '',
      Area: '',
      DoctorTypeId: '',
      Reviews: [],
      ClinicInfo: '',
      Address: '',
      GetDoctorSlots: []
    };

  AllMembers: {
    Name: any,
    Relationship: any,
    RelationshipId: any,
    DOB: any,
    Id: any,
    FamilyMemberId: any,
    PhoneNumber: any,
    Email: any,
    Image: any,
    Gender: any,
    CprNumber: any
  }[] = [];
  Long: number = 50.5758285;
  Lat: number = 26.2116501;
  isReadOnly: Boolean = false;
  get f() { return this.RequestAppForm.controls; }
  get s() { return this.RequestAppSchForm.controls; }

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
  RequestApp() {
    this.submitted = true;
    this.Loading1 = true;

    if (this.RequestAppForm.invalid) {
      this.Loading1 = false;
      return;

    }

    document.getElementById('loading').style.display = 'block';

    this.docpro.RequestApp(this.RequestAppForm.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Thanks for booking with us, Facility representative will contact you shortly to confirm your appointment.');
        this.RequestAppForm.reset();
        this.submitted = false;
        this.Loading1 = false;

        this.ngOnInit();
        document.getElementById('loading').style.display = 'none';

      }
      else {
        this.toast.error('Something Went Wrong');
        this.submitted = false;
        this.Loading1 = false;

        document.getElementById('loading').style.display = 'none';

      }
    });

  }
  RequestAppSch() {
    this.submitted2 = true;
    this.Loading2 = true;

    if (this.RequestAppSchForm.invalid) {
      this.Loading2 = false;

      return;
    }
    document.getElementById('loading').style.display = 'block';

    this.docpro.RequestAppSch(this.RequestAppSchForm.value).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.toast.success('Thanks for booking with us, Facility representative will contact you shortly to confirm your appointment.');
        this.RequestAppSchForm.reset();
        this.submitted2 = false;
        this.Loading2 = false;

        document.getElementById('loading').style.display = 'none';
        this.ngOnInit();
      }
      else {
        this.toast.error('Something Went Wrong');
        this.submitted2 = false;
        this.Loading2 = false;

        document.getElementById('loading').style.display = 'none';

      }
    });

  }
  GetMobCpr(x) {
    this.isReadOnly = false;
    if (x == this.UserID) {
      if (this.CprN)
        this.isReadOnly = true;

      this.RequestAppForm.patchValue({
        PatientId: this.UserID,
        CPRNumber: this.CprN,
        ContactNumber: this.MopN
      });
      this.RequestAppSchForm.patchValue({
        PatientId: this.UserID,
        CPRNumber: this.CprN,
        ContactNumber: this.MopN
      });

    }
    else {

      if (this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].CprNumber)
        this.isReadOnly = true;

      this.RequestAppForm.patchValue({
        PatientId: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].FamilyMemberId,
        CPRNumber: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].CprNumber,
        ContactNumber: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].PhoneNumber
      });
      this.RequestAppSchForm.patchValue({
        PatientId: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].FamilyMemberId,
        CPRNumber: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].CprNumber,
        ContactNumber: this.AllMembers.filter(it => it['FamilyMemberId'].toString() == x.toString())[0].PhoneNumber,
      });
    }
  }
  ChooseSlot(SID: any) {
    let date = new Date(this.DocDetails.GetDoctorSlots.filter(it => it['SlotId'] == SID)[0].Date);
    this.RequestAppSchForm.patchValue({
      SlotId: SID,
      Date: (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear(),
    })
  }
  ngOnInit() {

    this.calendar();
    this.calendarmob();
    this.Data = this.Send.GetData();
    if (this.CprN)
      this.isReadOnly = true;

    this.docpro.GetDoctorDetails(this.DocID, this.FacID, this.UserID).subscribe((res: any) => {
      this.DocDetails = res;
      document.getElementById('page-loader').style.display = 'none';

      this.RequestAppForm.patchValue({
        PatientId: this.UserID,
        CPRNumber: this.CprN,
        ContactNumber: this.MopN,
        FacilityId: this.FacID,
        SpecialtyId: this.DocDetails.Specialities[0].Id,
        DoctorId: this.DocID,
        RequestType: ''
      });
      this.RequestAppSchForm.patchValue({
        PatientId: this.UserID,
        CPRNumber: this.CprN,
        DoctorId: this.DocID,
        RequestType: '',
        SlotId: this.SlotID,
        Date: (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear(),
        ContactNumber: this.MopN
      });
      this.Lat = this.DocDetails.FacilityLocation.split(',')[0];
      this.Long = this.DocDetails.FacilityLocation.split(',')[1];
      console.log(this.DocDetails);
    });
    this.docpro.GetAllMembers(this.UserID).subscribe((res: any) => {
      this.AllMembers = res;

    });
  }

}
