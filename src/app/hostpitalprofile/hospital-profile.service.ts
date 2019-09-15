import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class HospitalProfileService {

  constructor(private http: HttpClient) { }
  GetFacDetails(FacID: any, UserID: any) {
    return this.http.get(endpoint('FacDetails') +'FacilityId=' + FacID + '&UserId=' + UserID);
  }
}
