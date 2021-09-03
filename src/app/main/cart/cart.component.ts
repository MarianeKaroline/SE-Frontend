import { TotalCartModel } from './models/totalCart.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total: TotalCartModel;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.getTotal();
  }

  getTotal() {
    this.cartService.getTotal()
      .subscribe(total => {
        this.total = total;
      })
  }

}
