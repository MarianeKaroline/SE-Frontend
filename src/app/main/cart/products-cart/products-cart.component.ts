import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  products: ProductCartModel[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cartService.getProducts()
      .subscribe(products => {
        this.products = products;
        console.log(products);
      })
  }

}
