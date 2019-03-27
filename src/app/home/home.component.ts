import { Component, OnInit } from '@angular/core';
import { HomeApiService } from './home-api.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeapi: HomeApiService) { }
  AboutUs: {
    Content: any,
    Title: any
  } = {
    Content: '',
      Title: ''
    };
  ngOnInit() {
    this.homeapi.GetAbout().subscribe((res: any) => {
      if (res)
        this.AboutUs = res[0];
    });
  }

}
