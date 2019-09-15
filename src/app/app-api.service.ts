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
  GetAllSpecs() {
    return this.http.get(endpoint('AllSpecs'));
  }
  GetAllAreas() {
    return this.http.get(endpoint('AllAreas'));
  }
  GetAllComps() {
    return this.http.get(endpoint('AllComps'));
  }
  GetSocial(){
    return this.http.get(endpoint('About'));

  }

}
