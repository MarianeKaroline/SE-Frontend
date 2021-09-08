import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY'
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YY'
  }
};

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
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
              private formBuilder: FormBuilder) { }

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
    this.userService.addCard(this.form.value)
    .subscribe()

    this.form.reset();
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
