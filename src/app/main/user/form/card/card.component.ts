import { CartService } from './../../../cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  form: FormGroup;
  card: boolean = true;
  sessionId: string;
  flag: string;
  creditCard: {
    number: string;
    valid: string;
    cvv: string;
    name: string;
  };

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.sessionId = localStorage.getItem('sessionId');
    this.form = this.formBuilder.group({
      cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]],
      name: [null, Validators.required],
      shelfLife: [null, Validators.required],
      cvv: [null, [Validators.pattern('^[0-9]{3}$'), Validators.required]],
      cpf: [this.sessionId]
    });
  }

  addCard() {
    console.log(this.form.value);
    this.userService.addCard(this.form.value)
    .subscribe()

    this.cartService.nextClicked();
  }

  newCard() {
    this.card = !this.card;
  }

  get getControl() {
    return this.form.controls;
  }

  validate(): string {
    if (this.form.value.cardNumber) {
      if (this.form.value.cardNumber.substring(0,4) == '1234') {
        return "elo";
      }
      else if (this.form.value.cardNumber.substring(0,4) == '2345') {
        return "mastercard";
      }
      else if (this.form.value.cardNumber.substring(0,4) == '4567') {
        return "visa";      }

    }
    return "";
  }

  creditCardNumber(): string {
    if (this.form.value.cardNumber) {
      var first = this.form.value.cardNumber.substring(0,4);
      var second = this.form.value.cardNumber.substring(4,8);
      var third = this.form.value.cardNumber.substring(8,12);
      var ford = this.form.value.cardNumber.substring(12,16);
      return first + " " + second + " " + third + " " + ford;
    }
    return "";
  }

  valid(): string {
    if (this.form.value.shelfLife) {
      return this.form.value.shelfLife;
    }
    return "";
  }

  securityCode(): string {
    if (this.form.value.cvv) {
      return this.form.value.cvv;
    }
    return "";
  }

  cardHolder(): string {
    if (this.form.value.name) {
      return this.form.value.name;
    }
    return "";
  }
}
