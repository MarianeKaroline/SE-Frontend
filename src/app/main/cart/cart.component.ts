import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TotalCartModel } from './models/totalCart.model';
import { Component, Inject, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CartService } from './cart.service';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';
import { Payment } from 'src/app/static_data/payment.enum';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../user/authentication/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  constructor(
    private cartService: CartService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.cartService.setSubjectAdded(false);

    this.cartService.products$
      .pipe(untilDestroyed(this))
      .subscribe(products => this.products = products);

    this.cartService.total$
      .pipe(untilDestroyed(this))
      .subscribe(total => this.total = total);


    this.authService.sessionId
      .pipe(untilDestroyed(this))
      .subscribe(res => this.logged = res);
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
