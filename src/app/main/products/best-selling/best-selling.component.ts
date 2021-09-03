import { CartService } from './../../cart/cart.service';
import { BestSellingModel } from './../models/bestSelling.model';
import { ProductsService } from './../products.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    this.appService.getIpAddress();

    this.onBestSelling();

  }

  onBestSelling() {
    this.productService.getBestSelling()
      .subscribe(product => {
        this.products = product;
      });
  }

  addProducts(id: number) {
    console.log("id: " + id);
    this.cartService.addProducts(id)
      .subscribe(product => {
        console.log(product);
      })
  }

  showSideNav(id: number) {
    this.sidebarOpen = this.sidebarOpen === false ? true : false; // não vai ter,  fazer uma função 'closeSideNav', quando clicar no x fechar a side, passando o this.sidebarOpen como true
    this.appService.sidebarToggler(this.sidebarOpen);
  }
}
