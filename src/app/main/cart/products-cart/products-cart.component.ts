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
    this.cartService.getProducts().subscribe;

    this.cartService.productsCart$
    .subscribe(products => this.products = products);
  }

  addProducts(id: number) {
    this.cartService.addProducts(id)
    .subscribe();
  }

  deleteProducts(id: number) {
    this.cartService.deleteProducts(id)
    .subscribe();
  }

}
