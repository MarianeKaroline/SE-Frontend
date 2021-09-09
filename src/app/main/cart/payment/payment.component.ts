import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { PaymentModel } from './../models/payment.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Payment } from 'src/app/static_data/payment.enum';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  method: PaymentModel[] = [];
  paymentMethod: number = 0;
  paymentEnum = Payment;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.payment();
  }

  payment() {
    this.cartService.getPayment()
    .subscribe(method => {
      this.method = method
    });
  }

  pMethod(id: number) {
    this.paymentMethod = id;
    window.localStorage.setItem("paymentId", id.toString())

    if (id == this.paymentEnum.pix || id == this.paymentEnum.bankSlip) {
      if (localStorage.getItem("cardId") != null) {
        window.localStorage.removeItem("cardId")
      }

      this.router.navigateByUrl('/bought/preview')
    }
  }


}
