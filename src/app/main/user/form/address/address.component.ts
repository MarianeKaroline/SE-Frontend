import { CartService } from './../../../cart/cart.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddressComponent implements OnInit {
  form: FormGroup;
  address: boolean = true;
  addressId: number;
  sessionId: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.sessionId = localStorage.getItem('sessionId');
    this.form = this.formBuilder.group({
      postcode: [null, [Validators.pattern('^[0-9]{8}$'), Validators.required]],
      street: [null, Validators.required],
      number: [null, [Validators.pattern('^[0-9]{1,5}$'), Validators.required]],
      city: [null, Validators.required],
      state: [null, Validators.required],
      cpf: [this.sessionId],
    });
  }

  addAddress() {
    this.userService.addAddress(this.form.value).subscribe((address) => {
      this.addressId = +address;
      window.localStorage.setItem('addressId', this.addressId.toString());
    });

    this.cartService.nextClicked();
  }

  newAddress() {
    this.address = !this.address;
  }

  getPostErrorMessage() {
    if (this.form.get("postcode").hasError('required')) {
      console.log('entrou 2');
      return 'You must enter a value';
    }
    return this.form.get("postcode").hasError('pattern')
      ? 'Must be only numbers and 8 char'
      : '';
  }

  getStreetMessage() {
      if (this.form.get("street").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }

  getNumberMessage() {
    if (this.form.value.number) {
      if (this.form.value.number.hasError('required')) {
        return 'You must enter a value';
      }
      return this.form.value.number.hasError('pattern')
        ? 'Must be only numbers and need at least 8 char'
        : '';
    }

    return '';
  }

  getCityMessage() {
    if (this.form.value.city) {
      if (this.form.value.city.hasError('required')) {
        return 'You must enter a value';
      }
    }

    return '';
  }

  getStateMessage() {
    if (this.form.value.city) {
      if (this.form.value.city.hasError('required')) {
        return 'You must enter a value';
      }
    }

    return '';
  }

  get getControl() {
    return this.form.controls;
  }
}
