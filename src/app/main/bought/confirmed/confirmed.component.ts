import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Subscription } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { TotalCartModel } from '../../cart/models/totalCart.model';
import { BoughtService } from '../bought.service';
import { PreviewBoughtModel } from '../models/previewBought.model';

@UntilDestroy()
@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  width: 10;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-700.jpg'
  preview: PreviewBoughtModel;
  total: TotalCartModel;

  constructor(private boughtService: BoughtService, private cartService: CartService) { }

  ngOnInit(): void {
    this.boughtService.preview()
      .pipe(untilDestroyed(this))
      .subscribe(preview => {
        this.cartService.removeList();
        this.preview = preview;
      });

    this.cartService.total$
      .pipe(untilDestroyed(this))
      .subscribe(total => this.total = total);

    this.boughtService.addBought()
      .pipe(untilDestroyed(this))
      .subscribe(() => {});
  }
}
