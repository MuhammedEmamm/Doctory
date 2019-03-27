import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MyappoinetmentsComponent } from './myappoinetments/myappoinetments.component';
import { FamilyMembersComponent } from './family-members/family-members.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HostpitalprofileComponent } from './hostpitalprofile/hostpitalprofile.component';
import { SignupComponent } from './signup/signup.component';
import { Doctorprofile2Component } from './doctorprofile2/doctorprofile2.component';
import { HospitalslistComponent } from './hospitalslist/hospitalslist.component';
import { FavouritesComponent } from './favourites/favourites.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctor-list', component: DoctorlistComponent },
  { path: 'hospital-profile', component: HostpitalprofileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'doctor-profile', component: Doctorprofile2Component },
  { path: 'contact', component: ContactusComponent },
  { path: 'my-appoinetments', component: MyappoinetmentsComponent },
  { path: 'my-profile', component: MyprofileComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'family-members', component: FamilyMembersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doc-profile', component: DoctorprofileComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'hospitalslist', component: HospitalslistComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'doc-profile2', component: Doctorprofile2Component },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DoctorlistComponent,
    DoctorprofileComponent,
    BlogsComponent,
    AboutComponent,
    ContactusComponent,
    MyappoinetmentsComponent,
    FamilyMembersComponent,
    MyprofileComponent,
    HostpitalprofileComponent,
    SignupComponent,
    Doctorprofile2Component,
    HospitalslistComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled' } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
