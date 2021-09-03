import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  products: ProductCartModel[] = [];

  constructor(private cartService: CartService,
    private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getIpAddress();

    this.getProducts();
  }

  getProducts() {
    this.cartService.getProducts()
      .subscribe(products => {
        this.products = products;
        console.log(products);
      })
  }

  addProducts(id: number) {
    console.log("id: " + id);
    this.cartService.addProducts(id)
      .subscribe(product => {
        console.log(product);
      })
  }

}
