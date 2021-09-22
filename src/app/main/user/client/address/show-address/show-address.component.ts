import { BoughtService } from './../../../../bought/bought.service';
import { CartService } from './../../../../cart/cart.service';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ShowAddressModel } from '../../../models/showAddress.model';
import { UserService } from '../../../user.service';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

// install Swiper modules
SwiperCore.use([Pagination]);

@UntilDestroy()
@Component({
  selector: 'app-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowAddressComponent implements OnInit {
  @Output() event = new EventEmitter<boolean>();
  addresses: ShowAddressModel[] = [];

  constructor(private userService: UserService,
              private cartService: CartService,
              private boughtService: BoughtService) { }

  ngOnInit(): void {
    this.userService.getAddresses()
      .pipe(untilDestroyed(this))
      .subscribe(address => this.addresses = address);
  }

  buy(id: number) {
    this.boughtService.setAddressId(id);

    this.event.emit(true);
  }
}
