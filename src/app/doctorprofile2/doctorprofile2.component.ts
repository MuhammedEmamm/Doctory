import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctorprofile2',
  templateUrl: './doctorprofile2.component.html',
  styleUrls: ['./doctorprofile2.component.css']
})
export class Doctorprofile2Component implements OnInit {
  public Slots: Object[][] = [[]];
  public SlotsMob: Object[] = [];

  Months: [{"Day" : any , "Date" : any , "FullDate" : any}] = [{Day:"" , Date :"" , FullDate : ""}];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthindex = 0 ; 

  
  constructor() { 
    this.calendar();
  }


  calendar() {
    let today = new Date();
    this.Months[0].Day = `${this.days[today.getDay()].substr(0,3)}` ; 
    this.Months[0].Date =  `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}`; 
    this.Months[0].FullDate =  today;
    today.setDate(today.getDate() + 1);
    console.log(today);
    this.Months.push({"Day" : `${this.days[today.getDay()].substr(0,3)}` , "Date" : `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}` , "FullDate" : today}) ; 

    today.setDate(today.getDate() + 1);
    console.log(today);

    this.Months.push({"Day" : `${this.days[today.getDay()].substr(0,3)}` , "Date" : `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}`,  "FullDate" : today}) ; 
    console.log(this.Months) ;     

    

  }

  slidecalendarnext(){
    console.log("aho ") ; 
    
    let today = this.Months[this.monthindex+2].FullDate ; 
  
  
    today.setDate(today.getDate() + 1);

  
    this.Months.push({"Day" : `${this.days[today.getDay()].substr(0,3)}` , "Date" : `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}` , FullDate : today}) ; 

    today.setDate(today.getDate() + 1);

    this.Months.push({"Day" : `${this.days[today.getDay()].substr(0,3)}` , "Date" : `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}` , FullDate : today}) ; 
    console.log(this.Months) ;     

    today.setDate(today.getDate() + 1);

    this.Months.push({"Day" : `${this.days[today.getDay()].substr(0,3)}` , "Date" : `${this.monthNames[today.getMonth()].substr(0,3)} ${today.getDate()}` , FullDate : today}) ; 
    console.log(this.Months) ;     
    
    this.monthindex+=3; 


  }

  slidecalendarprev(){
    if(this.monthindex!==0)
    this.monthindex-=3; 
  }
  ngOnInit() {
  }

}
