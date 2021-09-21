import { UserService } from './../../main/user/user.service';
import { CartService } from './../../main/cart/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TotalCartModel } from 'src/app/main/cart/models/totalCart.model';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/main/user/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
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
    this.subscriptions.push(this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
          this.home = event.url;
      }));
  }

  ngOnInit(): void {

    this.subscriptions.push(this.cartService.total$
      .subscribe(amount => {
        this.total = amount.totalAmount != null ? amount.totalAmount : 0;
      }));

    this.subscriptions.push(this.authService.employee.subscribe(res => this.employee = res));
    this.subscriptions.push(this.authService.sessionId.subscribe(res => this.sessionId = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  loggOut() {
    this.userService.LoggOut();
  }

}
