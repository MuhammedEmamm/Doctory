import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';
@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private http: HttpClient) { }
  GetAbout() {
    return this.http.get(endpoint('GetAboutUs'));
  }
}
