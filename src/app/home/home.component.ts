import { Component, OnInit } from '@angular/core';
import { HomeApiService } from './home-api.service'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeapi: HomeApiService, private Cookie: CookieService) { }
  AboutUs: {
    Content: any,
    Title: any
  } = {
      Content: '',
      Title: ''
    };
  
  ngOnInit() {
    this.homeapi.GetAbout().subscribe((res: any[]) => {
      if (res !== undefined && res.length) {
        this.AboutUs = res[0];
      }

    });
    
  }

}
