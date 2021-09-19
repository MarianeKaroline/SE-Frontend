import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.dialog.html',
  styleUrls: ['./success.dialog.scss']
})
export class SuccessDialog {

  constructor(public dialogRef: MatDialogRef<SuccessDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
