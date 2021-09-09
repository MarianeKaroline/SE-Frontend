import { CartService } from './../../cart/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BoughtService } from '../bought.service';
import { PreviewBoughtModel } from '../models/previewBought.model';
import { TotalCartModel } from '../../cart/models/totalCart.model';

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
    .subscribe(preview => {
      this.preview = preview;
    })

    this.cartService.getTotal()
    .subscribe(() => {});

    this.cartService.totalCart$
    .subscribe(total => this.total = total)
  }

  confirm() {
    this.boughtService.addBought()
    .subscribe(() => {});

    this.router.navigateByUrl('/bought/confirmed');
  }

}
