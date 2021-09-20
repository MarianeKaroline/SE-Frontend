import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteDialog } from 'src/app/shared/dialogs/delete/delete.dialog';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';

export interface DialogData {
  sure: boolean;
}

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  products: ProductCartModel[] = [];
  del: boolean = false;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.cartService.products$
      .subscribe(products => this.products = products));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  addProducts(id: number) {
    this.subscriptions.push(this.cartService.addProduct(id)
      .subscribe(bool => console.log(bool)));
  }

  delete(id: number) {
    this.subscriptions.push(this.cartService.removeProduct(id)
      .subscribe(bool => console.log(bool)));
  }

  deleteProducts(id: number) {
    this.subscriptions.push(this.cartService.removeProducts(id)
      .subscribe(bool => console.log(bool)));
  }

  dialogDelete(id: number, removeOne: boolean) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && removeOne) {
        this.delete(id);
      }
      else if(result && !removeOne) {
        this.deleteProducts(id);
      }
    });
  }
}


