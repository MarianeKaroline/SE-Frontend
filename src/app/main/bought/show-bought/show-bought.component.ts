import { Router } from '@angular/router';
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
  rater: number = 0;
  starCount: number = 5;
  productId: number = 0;

  starColor:StarRatingColor = StarRatingColor.accent;

  ratingArr = [];
  boughts: BoughtModel[] = [];

  constructor(private boughtService: BoughtService, private router: Router) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

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

  rating(productId: number) {
    this.productId = productId;
  }

  onClick(rating: number) {
    this.rater = rating;
  }

  showIcon(index: number) {
    if (this.rater >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  rate() {
    this.boughtService.rating(this.productId, this.rater)
      .subscribe(res => console.log(res));

    this.router.navigateByUrl('/bought/order-history');
  }
}
export enum StarRatingColor {
  accent = 'color: #f6bd60'
}
