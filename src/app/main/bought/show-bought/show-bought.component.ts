import { StatusBought } from './../../../static_data/status-bought.enum';
import { BoughtModel } from './../models/bought.model';
import { BoughtService } from './../bought.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-bought',
  templateUrl: './show-bought.component.html',
  styleUrls: ['./show-bought.component.scss']
})
export class ShowBoughtComponent implements OnInit {
  boughts: BoughtModel[] = [];

  constructor(private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.boughtService.show()
    .subscribe(boughts => this.boughts = boughts);
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
