import { Router } from '@angular/router';
import { BoughtService } from './../bought.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoughtModel } from '../models/bought.model';
import { StatusBought } from 'src/app/static_data/status-bought.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-bought',
  templateUrl: './all-bought.component.html',
  styleUrls: ['./all-bought.component.scss']
})
export class AllBoughtComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  boughts: BoughtModel[] = [];
  statusBought : string[] = [
    "Pending Confirmation",
    "Pending Payment",
    "Confirmed",
    "Canceled"
  ]
  statusEnum = StatusBought;

  constructor(private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.boughtService.getAll();

    this.subscriptions.push(this.boughtService.allBought$
      .subscribe(i => this.boughts = i));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
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
    this.subscriptions.push(this.boughtService.putStatus(boughtId, status)
      .subscribe(res => console.log(res)));
  }
}
