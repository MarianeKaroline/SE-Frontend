import { BoughtService } from './../../../../bought/bought.service';
import { CartService } from './../../../../cart/cart.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowAddressModel } from '../../../models/showAddress.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss']
})
export class ShowAddressComponent implements OnInit {
  @Output() event = new EventEmitter<boolean>();
  addresses: ShowAddressModel[] = [];

  constructor(private userService: UserService,
              private cartService: CartService,
              private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.userService.getAddresses()
    .subscribe(address => {
      this.addresses = address;
    })
  }

  buy(id: number) {
    this.boughtService.setAddressId(id);

    this.event.emit(true);
  }
}
