import { CartService } from './../../../../cart/cart.service';
import { Router } from '@angular/router';
import { ShowCardModel } from './../../../models/showCard.model';
import { UserService } from './../../../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss']
})
export class ShowCardComponent implements OnInit {
  card: boolean = false;
  cards: ShowCardModel[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.userService.GetCreditCards()
    .subscribe(cards => {
      this.cards = cards;
    });
  }

  continue(id: number) {
    this.cartService.creditCardId = id;

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
