import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowAddressModel } from '../../../models/showAddress.model';
import { UserService } from '../../../user.service';

@UntilDestroy()
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
      .pipe(untilDestroyed(this))
      .subscribe((address) => this.addresses = address);
  }
}
