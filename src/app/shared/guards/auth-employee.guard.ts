import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/main/user/authentication/authentication.service';
import { UserService } from 'src/app/main/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.getEmployee() && this.authService.getSessionId().length == 11) {
        return true
      }
      return this.router.createUrlTree(['/user/employeer/sign-in']);
  }

}
