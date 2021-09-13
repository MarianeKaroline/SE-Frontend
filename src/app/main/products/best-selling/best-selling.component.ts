import { CartService } from './../../cart/cart.service';
import { BestSellingModel } from './../models/bestSelling.model';
import { ProductsService } from './../products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent implements OnInit, OnDestroy {
  sidebarOpen=false;
  products: BestSellingModel[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {
    this.subscriptions.push(this.cartService.getTotal().subscribe());
  }

  ngOnInit(): void {
    this.onBestSelling();
  }

  ngOnDestroy() {
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

  addProducts(id: number) {
    this.subscriptions.push(this.cartService.addProducts(id)
      .subscribe(product => {
        console.log(product);
      }));
  }
}
