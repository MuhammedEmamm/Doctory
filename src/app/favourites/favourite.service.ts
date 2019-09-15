import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }
  GetFavFacs(UserID) {
    return this.http.get(endpoint('FavFacs') + 'UserId=' + UserID);
  }
  GetFavDocs(UserID) {
    return this.http.get(endpoint('FavDocs') + 'UserId=' + UserID);
  }
  FavouriteFac(data) {
    return this.http.post(endpoint('FavouriteFac'), data);
  }
  FavouriteDoc(data) {
    return this.http.post(endpoint('FavouriteDoc'), data);
  }

}
