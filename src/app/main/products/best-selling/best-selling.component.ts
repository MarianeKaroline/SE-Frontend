import { UserService } from 'src/app/main/user/user.service';
import { CartService } from './../../cart/cart.service';
import { BestSellingModel } from './../models/bestSelling.model';
import { ProductsService } from './../products.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BestSellingComponent implements OnInit, OnDestroy {
  sidebarOpen=false;
  products: BestSellingModel[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onBestSelling();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onBestSelling() {
    this.subscriptions.push(this.productService.getBestSelling()
      .subscribe(product => {
        this.products = product;
      }));
  }

  addProduct(id: number) {
    if (this.cartService.getVerifyEmployee() == false) {
      this.subscriptions.push(this.cartService.addProduct(id)
        .subscribe(product => console.log(product)));
    }
    else {
      this.snackBar.open("you cant add products to cart", "close", {
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
