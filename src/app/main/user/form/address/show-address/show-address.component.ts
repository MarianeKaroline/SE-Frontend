import { CartService } from './../../../../cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { ShowAddressModel } from '../../../models/showAddress.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss']
})
export class ShowAddressComponent implements OnInit {
  addresses: ShowAddressModel[] = [];
  address: boolean = false;

  constructor(private userService: UserService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.userService.showAddresses()
    .subscribe(address => {
      this.addresses = address;
    })
  }

  newAddress() {
    this.address = !this.address;
  }

  buy(id: number) {
    window.localStorage.setItem("addressId", id.toString())

    this.cartService.nextClicked();
  }
}
