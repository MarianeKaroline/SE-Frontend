import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/main/cart/products-cart/products-cart.component";

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete.dialog.html',
  styleUrls: ['delete.dialog.scss']
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>) {}

  onNoClick(del: boolean): void {
    this.dialogRef.close(del);
  }

}
