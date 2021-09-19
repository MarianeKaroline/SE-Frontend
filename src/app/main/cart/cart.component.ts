import { TotalCartModel } from './models/totalCart.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CartService } from './cart.service';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';
import { Payment } from 'src/app/static_data/payment.enum';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  paymentMethod: number = 0;
  paymentEnum = Payment;
  address: boolean = true;
  card: boolean = true;
  products: ProductCartModel[] = [];
  total: TotalCartModel;
  logged: string;

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit(): void {
    this.cartService.setSubjectAdded(false);

    this.cartService.products$
      .subscribe(products => this.products = products);

    this.cartService.total$
      .subscribe(total => this.total = total);


      this.userService.sessionId.subscribe(res => this.logged = res);
  }

  nextClicked() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  nextStepper(step: boolean) {
    this.stepper.selected.completed = step;
    this.stepper.next();
  }

  newAddress() {
    this.address = !this.address;
  }

  newCard() {
    this.card = !this.card;
  }

  payment(event) {
    this.paymentMethod = event;
  }



}
