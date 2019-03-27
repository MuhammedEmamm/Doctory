import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from './config';
@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(private http: HttpClient) { }

  GetContactUs(Data) {
    return this.http.post(endpoint('ContactUs'), Data);
  }

}
