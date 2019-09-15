import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';
@Injectable({
  providedIn: 'root'
})
export class MyProfileService {
  constructor(private http: HttpClient) { }
  GetUserDetails(Data: any) {
    return this.http.get(endpoint('Account') + '?UserId=' + Data + '&Lang=En');
  }
  EditProfile(Data: any) {
    return this.http.post(endpoint('EditProfile'), Data);
  }
  GetAllComps() {
    return this.http.get(endpoint('AllComps'));
  }
  UploadImg(Data) {
    return this.http.post(endpoint('UploadImage'), Data);
  }
}
