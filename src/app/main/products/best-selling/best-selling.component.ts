import { CartService } from './../../cart/cart.service';
import { BestSellingModel } from './../models/bestSelling.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent implements OnInit {
  sidebarOpen=false;
  products: BestSellingModel[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.onBestSelling();

  }

  onBestSelling() {
    this.productService.getBestSelling()
      .subscribe(product => {
        this.products = product;
      });
  }

  addProducts(id: number) {
    this.cartService.addProducts(id)
      .subscribe(product => {
        console.log(product);
      })
  }

  showSideNav(id: number) {
    this.appService.sidebarToggler(this.sidebarOpen);
    this.addProducts(id);
  }
}
