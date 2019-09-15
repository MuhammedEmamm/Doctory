import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }
  
  ForgetPassword(email : any){
    return this.http.post(endpoint('ForgetPas') , email) ; 
  }
  ResetPassword(Data : any){
    return this.http.post(endpoint('ResetPass') , Data) ; 
  }
  
}
