import { UserService } from '../../main/user/user.service';
import { AuthenticationComponent } from '../../main/user/authentication/authentication.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.sessionId.length == 11 && !this.userService.employee) {
        return true
      }
      return this.router.createUrlTree(['/user/auth']);
  }

}
