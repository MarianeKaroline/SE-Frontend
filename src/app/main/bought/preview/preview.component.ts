import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartService } from './../../cart/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BoughtService } from '../bought.service';
import { PreviewBoughtModel } from '../models/previewBought.model';
import { TotalCartModel } from '../../cart/models/totalCart.model';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  preview: PreviewBoughtModel;
  total: TotalCartModel;

  constructor(private boughtService: BoughtService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.boughtService.preview()
      .pipe(untilDestroyed(this))
      .subscribe(preview => this.preview = preview);

    this.cartService.total$
      .pipe(untilDestroyed(this))
      .subscribe(total => this.total = total);
  }

  confirm() {
    this.router.navigateByUrl('/bought/confirmed');
  }

}
