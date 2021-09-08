import { ShowAddressModel } from './../../models/showAddress.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {
  form: FormGroup;
  address: boolean = true;
  addressId: number;
  sessionId: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

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
      cpf: [this.sessionId]
    });
  }

  addAddress() {
    this.userService.addAddress(this.form.value)
    .subscribe(address => {
      this.addressId = +address
    })

    this.form.reset();
  }

  newAddress() {
    this.address = !this.address;
  }

  get getControl() {
    return this.form.controls;
  }

}
