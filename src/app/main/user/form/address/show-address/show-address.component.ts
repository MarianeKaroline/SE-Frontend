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
  addressId: number;
  address: boolean = false;

  constructor(private userService: UserService) { }

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
    this.addressId = id;
    console.log(this.addressId);
  }
}
