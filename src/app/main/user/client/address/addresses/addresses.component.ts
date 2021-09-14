import { Component, OnInit } from '@angular/core';
import { ShowAddressModel } from '../../../models/showAddress.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  addresses: ShowAddressModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAddresses()
    .subscribe((address) => {
      this.addresses = address;
    });
  }
}
