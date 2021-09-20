import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';
import { TotalCartModel } from '../models/totalCart.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  sidebarOpen = true;
  products: ProductCartModel[] = [];
  total: TotalCartModel;

  constructor(
    private cartService: CartService,
    private appService: AppService,
    private router: Router
  ) {
    this.subscriptions.push(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.appService.route = event.url;
    }));
  }

  ngOnInit(): void {

    this.subscriptions.push(this.cartService.products$
      .subscribe(products => this.products = products));

    this.subscriptions.push(this.cartService.total$
      .subscribe(total => this.total = total));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
