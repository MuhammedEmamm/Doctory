import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MyappointmentsService {

  constructor(private http: HttpClient) { }

  GetMyAppointments(UserID: any, StatusID: any) {
    return this.http.get(endpoint('GetMyAppointments') + 'UserId=' + UserID + '&StatusId=' + StatusID);
  }
  CancelAppointments(Data){
    return this.http.post(endpoint('UpdateStatusApp') , Data) ;  
  }
  CancelAppointmentsSch(Data){
    return this.http.post(endpoint('UpdateStatusAppSch') , Data) ;  
  }
  GetAllMembers(Data) {
    return this.http.get(endpoint('FamilyMembers') + '?UserId=' + Data);
  }
}
