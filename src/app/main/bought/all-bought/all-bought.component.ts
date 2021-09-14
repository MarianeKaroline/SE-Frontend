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

  constructor(private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.boughtService.getAll()
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
      return "Pending Payment"
    }
    else {
      return "Canceled"
    }
  }
}
