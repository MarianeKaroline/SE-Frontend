import { AuthenticationService } from './../../authentication/authentication.service';
import { BoughtService } from './../../../bought/bought.service';
import { CartService } from './../../../cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Output() event = new EventEmitter<boolean>();
  private subscriptions: Subscription[] = [];
  sessionId: string;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private boughtService: BoughtService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formConfig();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  formConfig() {
    this.subscriptions.push(this.authService.sessionId.subscribe(res => this.sessionId = res));

    this.form = this.formBuilder.group({
      cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]],
      name: [null, Validators.required],
      shelfLife: [null, Validators.required],
      cvv: [null, [Validators.pattern('^[0-9]{3}$'), Validators.required]],
      cpf: [this.sessionId]
    });
  }

  addCard() {
    this.subscriptions.push(this.userService.addCreditCard(this.form.value)
      .subscribe(card => {
        this.boughtService.setCreditCardId(card);
      }));

    this.router.navigateByUrl('/bought/preview');
  }

  get getControl() {
    return this.form.controls;
  }

  /* Validations */
  carNumberError() {
    if (this.form.get("cardNumber").hasError("required")) {
      return 'You must enter a value';
    }
    return this.form.get("cardNumber").hasError("pattern") ? 'Credit card number may only contain number and must have 16 digits' : '';
  }

  nameError() {
    if (this.form.get("name").hasError("required")) {
      return 'You must enter a value';
    }
    return '';
  }

  shelfLifeError() {
    if (this.form.get("shelfLife").hasError("required")) {
      return 'You must enter a value';
    }
    return '';
  }

  cvvError() {
    if (this.form.get("cvv").hasError("required")) {
      return 'You must enter a value';
    }
    return this.form.get("cvv").hasError("pattern") ? 'CVV number may only contain number and must have 3 digits' : '';
  }

  /* Show card */
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
