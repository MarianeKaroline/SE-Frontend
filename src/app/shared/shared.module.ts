import { DeleteDialog } from './dialogs/delete/delete.dialog';
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialog } from './dialogs/success/success.dialog';

@NgModule({
  declarations: [
    DeleteDialog,
    SuccessDialog
  ],
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule
  ],
  bootstrap: [],
})
export class SharedModule {}
