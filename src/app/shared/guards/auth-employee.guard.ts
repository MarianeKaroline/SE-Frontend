import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/main/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.getEmployee() && this.userService.getSessionId().length == 11) {
        return true
      }
      return this.router.createUrlTree(['/user/employeer/sign-in']);
  }

}
