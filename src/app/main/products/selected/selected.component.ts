import { ProductSelectedModel } from './../models/ProductSelected.model';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectedComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  sidebarOpen=false;
  selected: ProductSelectedModel;
  details: string[];
  id: number;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.onSelected();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onSelected() {
    this.subscriptions.push(this.productService.getSelected(this.id)
      .subscribe(product => {
        this.selected = product;
        this.details = product.detail.split(";");
      }));
  }

  addProduct(id: number) {
    if (this.cartService.getVerifyEmployee() == false) {
      this.subscriptions.push(this.cartService.addProduct(id)
        .subscribe(product => console.log(product)));
    }
    else {
      this.snackBar.open("you cant add products to cart", "close", {
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
