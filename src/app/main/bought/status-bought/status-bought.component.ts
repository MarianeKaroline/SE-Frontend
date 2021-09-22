import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BoughtService } from '../bought.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoughtModel } from '../models/bought.model';
import { StatusBought } from 'src/app/static_data/status-bought.enum';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-status-bought',
  templateUrl: './status-bought.component.html',
  styleUrls: ['./status-bought.component.scss']
})
export class StatusBoughtComponent implements OnInit {
  statusBought: string[] = [
    "Pending Confirmation",
    "Pending Payment",
    "Confirmed",
    "Canceled"
  ]
  orders: BoughtModel[] = [];
  id: number;
  statusEnum = StatusBought;

  constructor(
    private route: ActivatedRoute,
    private boughtService: BoughtService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.boughtService.getOrderStatus(params['id']);
        this.id = params['id'];
      });

      this.boughtService.allBought$
      .pipe(untilDestroyed(this))
      .subscribe(orders => this.orders = orders);
  }

  status(id: number) {
    if (id == StatusBought.pendingConfirmation) {
      return "Pending Confirmation"
    }
    else if (id == StatusBought.pendingPayment) {
      return "Pending Payment"
    }
    else if (id == StatusBought.confirmed) {
      return "Confirmed"
    }
    else {
      return "Canceled"
    }
  }

  updateStatus(boughtId: number, status: StatusBought) {
    this.boughtService.putStatus(boughtId, status)
      .pipe(untilDestroyed(this))
      .subscribe(res => console.log(res));
  }

}
