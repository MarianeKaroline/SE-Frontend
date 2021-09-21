import { AuthenticationService } from './../../main/user/authentication/authentication.service';
import { UserService } from '../../main/user/user.service';
import { AuthenticationComponent } from '../../main/user/authentication/authentication.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.getSessionId().length == 11 && !this.authService.getEmployee()) {
        return true
      }
      return this.router.createUrlTree(['/user/auth']);
  }

}
