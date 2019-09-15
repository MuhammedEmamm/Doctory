import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
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
import { AuthGuard } from './auth.guard';
import { DoclistService } from './doctorlist/doclist.service';
import { RegisetrationService } from './signup/regisetration.service';
import { SenderService } from './sender.service';
import { LoginService } from './login/login.service';
import { AppApiService } from './app-api.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'doctor-list', component: DoctorlistComponent, runGuardsAndResolvers: 'always' },
  { path: 'hospital-profile/:FacID', component: HostpitalprofileComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'about', component: AboutComponent, runGuardsAndResolvers: 'always' },
  { path: 'doctor-profile', component: Doctorprofile2Component, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'contact', component: ContactusComponent },
  { path: 'my-appoinetments', component: MyappoinetmentsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'my-profile', component: MyprofileComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'blogs', component: BlogsComponent },
  { path: 'family-members', component: FamilyMembersComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'login', component: LoginComponent },
  { path: 'doc-profile/:DocID/:FacID', component: DoctorprofileComponent,  canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'doc-profile/:DocID/:FacID/:SlotID/:Date', component: DoctorprofileComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },

  { path: 'sign-up', component: SignupComponent },
  { path: 'hospitalslist', component: HospitalslistComponent, runGuardsAndResolvers: 'always' },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'doc-profile2/:DocID/:SlotID', component: Doctorprofile2Component, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'doc-profile2/:DocID', component: Doctorprofile2Component, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },

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
    FavouritesComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCkvmG59L4Gw0Q12gZ_dr93-MQVunoDYuM'
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: false, scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    )
  ],
  providers: [EmailValidator, CookieService, AuthGuard, DoclistService, RegisetrationService, SenderService, LoginService, AppApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
