import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowCardModel } from '../../../models/showCard.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  cards: ShowCardModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.userService.GetCreditCards().subscribe((cards) => {
      this.cards = cards;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  creditCardNumber(cardNumber: string): string {
    var first = "****";
    var second = "****";
    var third = "****";
    var ford = cardNumber.substring(12,16);
    return first + " " + second + " " + third + " " + ford;
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
}
