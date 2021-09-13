import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';
import { TotalCartModel } from '../models/totalCart.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sidebarOpen = true;
  products: ProductCartModel[] = [];
  total: TotalCartModel;

  constructor(
    private cartService: CartService,
    private appService: AppService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.appService.route = event.url;
    });
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe;

    this.cartService.productsCart$
      .subscribe(products => this.products = products);

    this.cartService.totalCart$
      .subscribe(total => this.total = total)
  }

}
