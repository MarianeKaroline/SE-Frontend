import { BoughtService } from './bought.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxBarcodeModule } from 'ngx-barcode';
import localePt from '@angular/common/locales/pt';
import { ShowBoughtComponent } from './show-bought/show-bought.component';
import { MatDividerModule } from '@angular/material/divider';

registerLocaleData(localePt);

const routes: Routes = [
  {
    path: "preview",
    component: PreviewComponent
  },
  {
    path: "confirmed",
    component: ConfirmedComponent
  },
  {
    path: "order-history",
    component: ShowBoughtComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NgxQRCodeModule,
    MatFormFieldModule,
    MatInputModule,
    NgxBarcodeModule,
    MatDividerModule
  ],
  declarations: [
    PreviewComponent,
    ConfirmedComponent,
    ShowBoughtComponent
  ],
  exports:[RouterModule],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  BoughtService]
})
export class BoughtModule { }
