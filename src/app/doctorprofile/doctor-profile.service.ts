import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  constructor(private http: HttpClient) { }
  GetDocs(SpecID, FDate, TDate, UserID) {
    return this.http.get(endpoint('AllDocs') + 'SpecialtyId=' + SpecID + '&fromDate=' + FDate + '&toDate=' + TDate +'&Lang=En&UserId=' + UserID + '&FrontSlots=1');
  }
  GetDoctorDetails(ID: any, FacID: any, UserID: any) {
    return this.http.get(endpoint('DoctorDetails') + 'DoctorId=' + ID + '&FacilityId=' + FacID + '&UserId=' + UserID);
  }
  GetAllMembers(Data) {
    return this.http.get(endpoint('FamilyMembers') + '?UserId=' + Data);
  }
  RequestApp(Data) {
    return this.http.post(endpoint('ReqAppiontments'), Data);
  }
  RequestAppSch(Data) {
    return this.http.post(endpoint('ReqAppiontmentsSch'), Data);
  }
  
}
