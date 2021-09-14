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
    this.sessionId = this.userService.sessionId;
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
      this.cartService.addressId = +address;
    });

    this.cartService.nextClicked();
  }


  /* Validations */
  getPostErrorMessage() {
    if (this.form.get("postcode").hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get("postcode").hasError('pattern')
      ? 'Postcode number may only contain number and must have 8 digits'
      : '';
  }

  getStreetMessage() {
      if (this.form.get("street").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }

  getNumberMessage() {
      if (this.form.get("number").hasError('required')) {
        return 'You must enter a value';
      }
      return this.form.get("number").hasError('pattern')
        ? 'number may only contain number and must be between 1 and 5 digits'
        : '';
  }

  getCityMessage() {
      if (this.form.get("city").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }

  getStateMessage() {
      if (this.form.get("state").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }

  get getControl() {
    return this.form.controls;
  }
}
