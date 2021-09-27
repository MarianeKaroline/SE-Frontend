import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteDialog } from 'src/app/shared/dialogs/delete/delete.dialog';
import { CartService } from '../cart.service';
import { ProductCartModel } from '../models/productCart.model';

export interface DialogData {
  sure: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {
  products: ProductCartModel[] = [];
  del: boolean = false;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartService.products$
      .pipe(untilDestroyed(this))
      .subscribe(products => this.products = products);
  }

  addProducts(id: number) {
    this.cartService.addProduct(id)
      .pipe(untilDestroyed(this))
      .subscribe(bool => console.log(bool));

    this.cartService.setSubjectAdded(false);
  }

  delete(id: number) {
    this.cartService.removeProduct(id)
      .pipe(untilDestroyed(this))
      .subscribe(bool => console.log(bool));

    this.cartService.setSubjectAdded(false);
  }

  deleteProducts(id: number) {
    this.cartService.removeProducts(id)
      .pipe(untilDestroyed(this))
      .subscribe(bool => console.log(bool));

    this.cartService.setSubjectAdded(false);
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


