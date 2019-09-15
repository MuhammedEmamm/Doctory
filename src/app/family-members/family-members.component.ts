import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyfamiltService } from './myfamilt.service';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.css']
})
export class FamilyMembersComponent implements OnInit {

  constructor(private Cookie: CookieService, private modal: NgbModal, private formBuilder: FormBuilder, private toast: ToastrService, private myfamily: MyfamiltService) { }
  @ViewChild('EditFamily') EditFamily: TemplateRef<any>;
  AddFamilyMember: FormGroup = this.formBuilder.group({
    UserId: [''],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    DOB: ['', Validators.required],
    Gender: ['', Validators.required],
    Phonenumber: ['', Validators.required],
    ImageUrl: [''],
    RelationShipId: ['', Validators.required],
    CPRNumber: ['']

  });
  EditFamilyMember: FormGroup = this.formBuilder.group({
    UserId: [''],
    FamilyMemberId: [''],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    DOB: ['', Validators.required],
    Gender: ['', Validators.required],
    Phonenumber: ['', Validators.required],
    ImageUrl: [''],
    RelationShipId: ['', Validators.required],
    CPRNumber: ['']
  });
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

  submitted = false;
  submitted2 = false;
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
  Relations: {
    name: any,
    Id: any,
    ImageUrl: any,
    Rank: any
  }[] = [];
  Member: {
    FamilyMemberId: any,
    UserId: any,
    Firstname: any,
    Lastname: any,
    DOB: any,
    Gender: any,
    PhoneNumber: any,
    RelationShipId: any,
    Email: any,
    ImageUrl: any,
    CPRNumber: any
  } = {
      FamilyMemberId: '',
      UserId: '',
      Firstname: '',
      Lastname: '',
      DOB: '',
      Gender: '',
      PhoneNumber: '',
      RelationShipId: '',
      Email: '',
      ImageUrl: '',
      CPRNumber: ''
    };
  get f() { return this.AddFamilyMember.controls; }
  get s() { return this.EditFamilyMember.controls; }
  Image: any = 'assets/images/user.png';
  Image2: any = 'assets/images/user.png';

  MemberDetails(ID) {
    this.Member = this.AllMembers.filter(it => it['Id'] == ID).map(mem => ({ FamilyMemberId: mem['FamilyMemberId'], UserId: this.Cookie.get('U_ID'), Firstname: mem['Name'].split(" ")[0], Lastname: mem['Name'].split(" ")[1], DOB: mem['DOB'], Gender: mem['Gender'], PhoneNumber: mem['PhoneNumber'], RelationShipId: mem['RelationshipId'], Email: mem['Email'], ImageUrl: mem['Image'], CPRNumber: mem['CprNumber'] }))[0];
    this.modal.open(this.EditFamily, { size: 'lg' });
    this.EditFamilyMember.patchValue({
      UserId: this.Cookie.get('U_ID'),
      FirstName: this.Member.Firstname,
      LastName: this.Member.Lastname,
      DOB: new Date(this.Member.DOB).toISOString().slice(0,10),
      Gender: this.Member.Gender,
      RelationShipId: this.Member.RelationShipId,
      Email: this.Member.Email,
      Image: this.Member.ImageUrl,
      Phonenumber: this.Member.PhoneNumber.split('-')[1],
      FamilyMemberId: this.Member.FamilyMemberId,
      CPRNumber: this.Member.CPRNumber
    });
    this.Image2 = this.Member.ImageUrl;
  }
  EditMember() {
    this.submitted2 = true;
    this.AddFamilyMember.patchValue({
      Phonenumber: this.Code + '-' + this.EditFamilyMember.value.Phonenumber
    });

    this.myfamily.AddFamilyMember(this.EditFamilyMember.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Updated Successfully');
        this.modal.dismissAll();
        this.EditFamilyMember.reset();
        this.submitted2 = false;
        this.ngOnInit();
      }
    })
  }
  AddMember() {
    this.submitted = true;
    if (this.AddFamilyMember.invalid) {
      return;
    }
    this.AddFamilyMember.patchValue({
      UserId: this.Cookie.get('U_ID')
    });
    this.AddFamilyMember.patchValue({
      Phonenumber: this.Code + '-' + this.AddFamilyMember.value.Phonenumber
    });
    this.myfamily.AddFamilyMember(this.AddFamilyMember.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('Member Added Successfully');
        this.AddFamilyMember.reset();
        this.submitted = false;
        this.ngOnInit();
      }
    });
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.myfamily.UploadImg(input).subscribe((res: any) => {
      console.log(res);
      this.AddFamilyMember.patchValue({
        ImageUrl: res
      });
      this.Image = res;
      this.Image = 'http://docpoc.co/DoctoryBackEnd/' + res;

    });

  }
  onFileChangedEdit(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.myfamily.UploadImg(input).subscribe((res: any) => {
      console.log(res);
      this.EditFamilyMember.patchValue({
        ImageUrl: res
      });
      this.Image2 = res;
      this.Image2 = 'http://docpoc.co/DoctoryBackEnd/' + res;

    });

  }
  ngOnInit() {
    this.Image = 'assets/images/user.png';
    this.Image2 = 'assets/images/user.png';
    this.myfamily.GetAllMembers(this.Cookie.get('U_ID')).subscribe((res: any) => {
      this.AllMembers = res;
    });
    this.myfamily.AllRelations().subscribe((res: any) => {
      this.Relations = res;
    });
  }

}
