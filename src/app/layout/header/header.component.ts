import { UserService } from './../../main/user/user.service';
import { CartService } from './../../main/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TotalCartModel } from 'src/app/main/cart/models/totalCart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employee: boolean
  home: any;
  sessionId: string;
  total: Observable<number>;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
        this.home = event.url;
    });
  }

  ngOnInit(): void {
    this.employee = this.userService.employee;

    this.total = this.cartService.getTotal()
    .pipe(
      map((total) => {
        return total.totalAmount
      })
    );

    this.sessionId = this.userService.sessionId;
  }

  loggOut() {
    this.userService.LoggOut();
  }

}
