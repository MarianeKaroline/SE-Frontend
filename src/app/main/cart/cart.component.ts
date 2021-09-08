import { TotalCartModel } from './models/totalCart.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AppService } from 'src/app/app.service';
import { ProductCartModel } from './models/productCart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: ProductCartModel[] = [];
  total: TotalCartModel;
  logged: string;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getTotal()
    .subscribe();

    this.cartService.totalCart$
    .subscribe(total => this.total = total)

    this.getProducts();

    this.cartService.productsCart$
    .subscribe(products => this.products = products);

    this.logged = localStorage.getItem('sessionId');
  }

  getProducts() {
    this.cartService.getProducts()
      .subscribe(products => {
        this.products = products;
        console.log(products);
      })
  }
}
