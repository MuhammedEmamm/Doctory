import { Component, OnInit } from '@angular/core';
import { MyappointmentsService } from './myappointments.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-myappoinetments',
  templateUrl: './myappoinetments.component.html',
  styleUrls: ['./myappoinetments.component.css']
})
export class MyappoinetmentsComponent implements OnInit {

  constructor(private myapp: MyappointmentsService, private Cookie: CookieService, private toast: ToastrService) {
  }
  NotFound: Boolean = false;
  NotFound2: Boolean = false;
  NotFound3: Boolean = false;

  PendingList: {
    AppointmentStatus: any,
    ClinicContactNumber: any,
    ClinicLocation: any,
    ClinicName: any,
    CprNumber: any,
    DateTime: any,
    DetailedStatus: any,
    DetailedStatusId: any,
    DoctorId: any,
    DoctorName: any,
    FacilityId: any,
    Id: any,
    IsRated: any,
    IsSlot: any,
    PatientName: any,
    RequestType: any,
    Specialty: any,
    Time: any,
  }[] = [];
  ConfirmList: {
    AppointmentStatus: any,
    ClinicContactNumber: any,
    ClinicLocation: any,
    ClinicName: any,
    CprNumber: any,
    DateTime: any,
    DetailedStatus: any,
    DetailedStatusId: any,
    DoctorId: any,
    DoctorName: any,
    FacilityId: any,
    Id: any,
    IsRated: any,
    IsSlot: any,
    PatientName: any,
    RequestType: any,
    Specialty: any,
    Time: any,
  }[] = [];
  CompletedList: {
    AppointmentStatus: any,
    ClinicContactNumber: any,
    ClinicLocation: any,
    ClinicName: any,
    CprNumber: any,
    DateTime: any,
    DetailedStatus: any,
    DetailedStatusId: any,
    DoctorId: any,
    DoctorName: any,
    FacilityId: any,
    Id: any,
    IsRated: any,
    IsSlot: any,
    PatientName: any,
    RequestType: any,
    Specialty: any,
    Time: any,
  }[] = [];
  CanceledList: {
    AppointmentStatus: any,
    ClinicContactNumber: any,
    ClinicLocation: any,
    ClinicName: any,
    CprNumber: any,
    DateTime: any,
    DetailedStatus: any,
    DetailedStatusId: any,
    DoctorId: any,
    DoctorName: any,
    FacilityId: any,
    Id: any,
    IsRated: any,
    IsSlot: any,
    PatientName: any,
    RequestType: any,
    Specialty: any,
    Time: any,
  }[] = [];
  CancelData: {
    AppointmentId: any,
    StatusId: any
  } = {
      AppointmentId: '',
      StatusId: ''
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
  UserID = this.Cookie.get('U_ID');
  UID = this.Cookie.get('U_ID');

  GetApps(UserID: any) {
    this.NotFound = false;
    this.NotFound2 = false;
    this.NotFound3 = false;

    this.CompletedList = [];
    this.ConfirmList = [];
    this.PendingList = [];

    document.getElementById('loading').style.display = 'block';
    document.getElementById('loading2').style.display = 'block';
    document.getElementById('loading3').style.display = 'block';

    this.myapp.GetMyAppointments(UserID, '1').subscribe((res: any) => {
      this.PendingList = res;
      document.getElementById('loading').style.display = 'none';
      if (this.PendingList.length)
        this.NotFound = false;
      else
        this.NotFound = true;
    });
    this.myapp.GetMyAppointments(UserID, '2').subscribe((res: any) => {
      this.ConfirmList = res;
      document.getElementById('loading2').style.display = 'none';
      if (this.ConfirmList.length)
        this.NotFound2 = false;
      else
        this.NotFound2 = true;
    });
    this.myapp.GetMyAppointments(UserID, '4').subscribe((res: any) => {
      this.CompletedList = res;
      document.getElementById('loading3').style.display = 'none';
      if (this.CompletedList.length)
        this.NotFound3 = false;
      else
        this.NotFound3 = true;
    });
  }
  CancelApp(Type: any, ID: any, date: any) {

    this.CancelData.AppointmentId = ID;
    this.CancelData.StatusId = '3';
    console.log(Type);
    if (Type === 0) {
      this.myapp.CancelAppointments(this.CancelData).subscribe((res: any) => {
        if (res) {
          this.toast.success('Canceled Successfully');
          this.GetApps(this.UserID);

        }
        else {
          this.toast.error('Something Went Wrong, Please Try Again Later :)');
        }
      });
    }
    else {
      this.myapp.CancelAppointmentsSch({ AppointmentId: this.CancelData.AppointmentId, StatusId: this.CancelData.StatusId, SlotId: Type, Date: date }).subscribe((res: any) => {
        if (res) {
          this.toast.success('Canceled Successfully');
          this.GetApps(this.UserID);
        }
        else {
          this.toast.error('Something Went Wrong, Please Try Again Later :)');
        }
      });
    }
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
  ngOnInit() {
    this.GetApps(this.UserID);
    this.myapp.GetAllMembers(this.UserID).subscribe((res: any) => {
      this.AllMembers = res;

    });
  }

}
