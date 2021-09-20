import { CartService } from './../../cart/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BoughtService } from '../bought.service';
import { PreviewBoughtModel } from '../models/previewBought.model';
import { TotalCartModel } from '../../cart/models/totalCart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  preview: PreviewBoughtModel;
  total: TotalCartModel;

  constructor(private boughtService: BoughtService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.boughtService.preview()
      .subscribe(preview => {
        this.preview = preview;
      }));

    this.subscriptions.push(this.cartService.total$
      .subscribe(total => this.total = total));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  confirm() {
    this.router.navigateByUrl('/bought/confirmed');
  }

}
