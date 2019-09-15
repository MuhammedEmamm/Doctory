import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MyProfileService } from './my-profile.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  providers: [MyProfileService]
})
export class MyprofileComponent implements OnInit {

  constructor(private mypro: MyProfileService, private Cookie: CookieService, private toast: ToastrService) { }


  Code: any = '+966';
  Codes: { name: any, code: any }[] = [
    { name: 'SA', code: '+966' },
    { name: 'YE', code: '+967' },
    { name: 'AE', code: '+971' },
    { name: 'KW', code: '+965' },
    { name: 'QA', code: '+974' },
    { name: 'OM', code: '+968' },
    { name: 'BH', code: '+973' },
    { name: 'SY', code: '+963' },
    { name: 'IQ', code: '+964' },
    { name: 'PS', code: '+970' },
    { name: 'LB', code: '+961' },
    { name: 'JO', code: '+962' },
    { name: 'EG', code: '+20' },
    { name: 'MA', code: '+212' },
    { name: 'TN', code: '+216' },
    { name: 'DZ', code: '+213' },
    { name: 'LY', code: '+218' },
    { name: 'SD', code: '+249' },
    { name: 'MR', code: '+222' },
    { name: 'SO', code: '+252' },
    { name: 'DJ', code: '+253' },
    { name: 'KM', code: '+269' },
  ];


  UserData: {
    DOB: any,
    Email: any,
    FirstName: any,
    LastName: any,
    Gender: any,
    Image: any,
    MobileNumber: any,
    InsuranceCompanyId: any,
    Password: any,
    CprNumber: any
  } = {
      DOB: '',
      Email: '',
      FirstName: '',
      LastName: '',
      Gender: '',
      Image: '',
      MobileNumber: '',
      InsuranceCompanyId: '',
      Password: '',
      CprNumber: ''
    };
  Comps: {
    Name: any,
    Id: any,
    ImageUrl: any
  }[] = [];
  Image: any = 'assets/images/user.png';

  GetComps() {
    this.mypro.GetAllComps().subscribe((res: any) => {
      this.Comps = res;
    });

  }
  EditPro() {
    this.UserData.MobileNumber = this.Code + '-' + this.UserData.MobileNumber;
    if (this.UserData.Image == 'assets/images/user.png')
      this.UserData.Image = '';
    console.log(this.UserData);
    this.mypro.EditProfile(this.UserData).subscribe((res: any) => {
      if (res) {
        this.toast.success('Profile Updated Successfully');
        this.ngOnInit();
      }
    });
  }
  updateUrl() {
    this.Image = 'assets/images/user.png';
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.mypro.UploadImg(input).subscribe((res: any) => {
      console.log(res);
      this.UserData.Image = res;
      this.EditPro();
    });


  }

  ngOnInit() {
    this.mypro.GetUserDetails(this.Cookie.get('U_ID')).subscribe((res: any) => {
      this.UserData = res;
      document.getElementById('page-loader').style.display = 'none';
      this.UserData.DOB = new Date(this.UserData.DOB).toISOString().slice(0, 10);
      if (this.UserData.MobileNumber) {
        let s : any;
        s = this.UserData.MobileNumber;
        this.UserData.MobileNumber = s.split('-')[1];
        this.Code = s.split('-')[0];
      }
    });
    this.GetComps();
  }

}
