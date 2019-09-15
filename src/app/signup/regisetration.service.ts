import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RegisetrationService {

  constructor(private http: HttpClient) { }
  SignUp(Data: any) {
    return this.http.post(endpoint('Register'), Data);
  }
  UploadImg(Data) {
    return this.http.post(endpoint('UploadImage'), Data);
  }

}
