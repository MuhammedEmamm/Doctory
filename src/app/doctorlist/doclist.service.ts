import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DoclistService {

  constructor(private http: HttpClient) { }

  GetDocs(SpecID, FDate, TDate, InsID, AreaID, UserID, NatID, QualID, LangID, Gender) {
    return this.http.get(endpoint('AllDocs') + 'SpecialtyId=' + SpecID + '&fromDate=' + FDate + '&toDate=' + TDate + '&InsuranceId=' + InsID + '&AreaId=' + AreaID + '&pageNumber=0' + '&Lang=En&UserId=' + UserID + '&FrontSlots=1' + '&QualificationId=' + QualID + '&LanguageId=' + LangID + '&NationalityId=' + NatID + '&gender=' + Gender);
  }
  GetQualifications() {
    return this.http.get(endpoint('AllQualifications'));
  }
  GetLanguages() {
    return this.http.get(endpoint('AllLanguages'));
  }
  GetNationalities() {
    return this.http.get(endpoint('AllNationalities'));
  }
  GetAllAreas() {
    return this.http.get(endpoint('AllAreas'));
  }
  GetAllComps() {
    return this.http.get(endpoint('AllComps'));
  }
  Favourite(data) {
    return this.http.post(endpoint('FavouriteDoc'), data);
  }

}