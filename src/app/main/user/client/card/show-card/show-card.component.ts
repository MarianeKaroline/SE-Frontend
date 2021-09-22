import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BoughtService } from './../../../../bought/bought.service';
import { CartService } from './../../../../cart/cart.service';
import { Router } from '@angular/router';
import { ShowCardModel } from './../../../models/showCard.model';
import { UserService } from './../../../user.service';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import { Subscription } from 'rxjs';

// install Swiper modules
SwiperCore.use([Pagination]);

@UntilDestroy()
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowCardComponent implements OnInit {
  @Output() event = new EventEmitter<boolean>();

  card: boolean = false;
  cards: ShowCardModel[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.userService.GetCreditCards()
      .pipe(untilDestroyed(this))
      .subscribe(cards => this.cards = cards);
  }

  continue(id: number) {
    this.boughtService.setCreditCardId(id);

    this.router.navigateByUrl('/bought/preview');
  }

  validate(cardNumber: string): string {
    if (cardNumber) {
      if (cardNumber.substring(0,4) == '1234') {
        return "elo";
      }
      else if (cardNumber.substring(0,4) == '2345') {
        return "mastercard";
      }
      else if (cardNumber.substring(0,4) == '4567') {
        return "visa";      }

    }
    return "";
  }

  creditCardNumber(cardNumber: string): string {
      var first = "****";
      var second = "****";
      var third = "****";
      var ford = cardNumber.substring(12,16);
      return first + " " + second + " " + third + " " + ford;
  }

  newCard() {
    this.card = !this.card;
  }

}
