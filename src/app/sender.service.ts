import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor() { }
  Data: {
    SpecialtyId: any,
    fromDate: any,
    toDate: any,
    pageNumber: any,
    AreaId: any,
    InsuranceId: any
  } = {
      SpecialtyId: 1,
      fromDate: (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
      toDate: (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
      pageNumber: 1,
      AreaId: '',
      InsuranceId: ''
    };
  SetData(SpecialtyId: any, fromDate: Date, toDate: Date, pageNumber: any, AreaId: any, InsuranceId: any) {
    this.Data.SpecialtyId = SpecialtyId;
    this.Data.fromDate = new Date(fromDate);
    this.Data.toDate = new Date (toDate);
    this.Data.pageNumber = pageNumber;
    this.Data.AreaId = AreaId;
    this.Data.InsuranceId = InsuranceId;
  }
  GetData() {
    return this.Data;
  }
}
