import { Router } from '@angular/router';
import { BoughtService } from './../bought.service';
import { Component, OnInit } from '@angular/core';
import { BoughtModel } from '../models/bought.model';
import { StatusBought } from 'src/app/static_data/status-bought.enum';

@Component({
  selector: 'app-all-bought',
  templateUrl: './all-bought.component.html',
  styleUrls: ['./all-bought.component.scss']
})
export class AllBoughtComponent implements OnInit {
  boughts: BoughtModel[] = [];
  statusBought : string[] = [
    "Pending Confirmation",
    "Pending Payment",
    "Confirmed",
    "Canceled"
  ]
  statusEnum = StatusBought;

  constructor(private boughtService: BoughtService, private router: Router) { }

  ngOnInit(): void {
    this.boughtService.allBought$
      .subscribe(i => this.boughts = i)
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
      .subscribe(res => console.log(res));
  }
}
