import { UserService } from './../../main/user/user.service';
import { CartService } from './../../main/cart/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TotalCartModel } from 'src/app/main/cart/models/totalCart.model';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/main/user/authentication/authentication.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employee: boolean
  home: any;
  sessionId: string;
  total: number;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe((event: NavigationEnd) => {
          this.home = event.url;
      });
  }

  ngOnInit(): void {

    this.cartService.total$
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(amount => {
        this.total = amount.totalAmount != null ? amount.totalAmount : 0;
      });

    this.authService.employee
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(res => this.employee = res);

    this.authService.sessionId
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(res => this.sessionId = res);
  }

  loggOut() {
    this.userService.LoggOut();
  }

}
