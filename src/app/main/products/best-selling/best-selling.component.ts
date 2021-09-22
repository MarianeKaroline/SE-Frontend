import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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

@UntilDestroy()
@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BestSellingComponent implements OnInit {
  sidebarOpen=false;
  products: BestSellingModel[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onBestSelling();
  }

  onBestSelling() {
    this.productService.getBestSelling()
      .pipe(untilDestroyed(this))
      .subscribe(product => this.products = product);
  }

  addProduct(id: number) {
    if (this.cartService.getVerifyEmployee() == false) {
      this.cartService.addProduct(id)
        .pipe(untilDestroyed(this))
        .subscribe(product => console.log(product));
    }
    else {
      this.snackBar.open("you cant add products to cart", "close", {
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
