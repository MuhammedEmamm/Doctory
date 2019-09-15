import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class HospitalListService {

  constructor(private http: HttpClient) { }
  GetFacs(SpecID, InsID, AreaID, UserID, FacTId) {
    return this.http.get(endpoint('AllFacs') + 'SpecialtyId=' + SpecID + '&InsuranceId=' + InsID + '&AreaId=' + AreaID + '&pageNumber=0' + '&Lang=En&UserId=' + UserID + '&FacilityTypeId=' + FacTId );
  }
  GetFacsTypes(){
    return this.http.get(endpoint('AllFacTypes')) ; 
  }
  GetAllAreas() {
    return this.http.get(endpoint('AllAreas'));
  }
  GetAllComps() {
    return this.http.get(endpoint('AllComps'));
  }
  Favourite(data) {
    return this.http.post(endpoint('FavouriteFac'), data);
  }
  
}
