import { TotalCartModel } from './models/totalCart.model';
import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';
import { Payment } from 'src/app/static_data/payment.enum';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../user/authentication/authentication.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;
  private subscriptions: Subscription[] = [];
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

    this.subscriptions.push(this.cartService.products$
      .subscribe(products => this.products = products));

    this.subscriptions.push(this.cartService.total$
      .subscribe(total => this.total = total));


    this.subscriptions.push(this.authService.sessionId.subscribe(res => this.logged = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
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
