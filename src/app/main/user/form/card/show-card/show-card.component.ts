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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.showCard();
  }

  showCard() {
    this.userService.showCard()
    .subscribe(card => {
      this.cards = card;
    });
  }

  continue(id: number) {
    window.localStorage.setItem("addressId", id.toString())
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
