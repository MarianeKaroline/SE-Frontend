import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  method: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  payment(id: number) {
    this.method = id;
  }

}
