import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private Cookie: CookieService , private toast : ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.Cookie.get('U_ID')) {
      return true;
    }
    this.toast.warning('You need to Log In to be able to request an appointment.') ; 
    return false;
  }
}
