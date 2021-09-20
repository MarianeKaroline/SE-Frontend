import { BoughtService } from './../../bought/bought.service';
import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { PaymentModel } from './../models/payment.model';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Payment } from 'src/app/static_data/payment.enum';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Output() paymentType = new EventEmitter<number>();

  private subscriptions: Subscription[] = [];
  method: PaymentModel[] = [];
  paymentMethod: number;
  paymentEnum = Payment;
  sessionId: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private boughtService: BoughtService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.sessionId
      .subscribe(res => this.sessionId = res));
    this.payment();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  payment() {
    this.subscriptions.push(this.cartService.payment()
      .subscribe(method => {
        this.method = method
      }));
  }

  pMethod(id: number) {
    this.paymentMethod = id;
    this.boughtService.setPaymentId(id);
    this.paymentType.emit(id);

    if (id == this.paymentEnum.pix || id == this.paymentEnum.bankSlip) {
      this.router.navigateByUrl('/bought/preview')
    }
  }


}
