import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MyfamiltService {

  constructor(private http: HttpClient) { }

  GetAllMembers(Data) {
    return this.http.get(endpoint('FamilyMembers') + '?UserId=' + Data);
  }
  AddFamilyMember(Data) {
    return this.http.post(endpoint('AddFamily'), Data);
  }
  AllRelations() {
    return this.http.get(endpoint('AllRelations'));
  }
  UploadImg(Data) {
    return this.http.post(endpoint('UploadImage'), Data);
  }
}
