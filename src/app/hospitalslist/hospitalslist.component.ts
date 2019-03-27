import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitalslist',
  templateUrl: './hospitalslist.component.html',
  styleUrls: ['./hospitalslist.component.css']
})
export class HospitalslistComponent implements OnInit {

  favo_flag = false;
  favo_flag1 = false;
  favo_flag2 = false;
  favo_flag3 = false;

  constructor() { }

  toggle() {
    this.favo_flag = !this.favo_flag ;
  }

  toggle1() {
    this.favo_flag1 = !this.favo_flag1 ;
  }
  toggle2() {
    this.favo_flag2 = !this.favo_flag2 ;
  }
  toggle3() {
    this.favo_flag3 = !this.favo_flag3 ;
  }
  ngOnInit() {
  }

}
