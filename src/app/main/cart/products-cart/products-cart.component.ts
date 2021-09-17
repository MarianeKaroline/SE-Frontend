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
    this.cartService.products$
      .subscribe(products => this.products = products);
  }

  addProducts(id: number) {
    this.cartService.addProduct(id)
      .subscribe(bool => console.log(bool));
  }

  delete(id: number) {
    this.cartService.removeProduct(id)
      .subscribe(bool => console.log(bool));
  }

  deleteProducts(id: number) {
    this.cartService.removeProducts(id)
      .subscribe(bool => console.log(bool));
  }

}
