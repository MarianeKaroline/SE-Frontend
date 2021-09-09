import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BoughtComponent } from './bought.component';
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

registerLocaleData(localePt);

const routes: Routes = [
  {
    path: "preview",
    component: PreviewComponent
  },
  {
    path: "confirmed",
    component: ConfirmedComponent
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
    NgxBarcodeModule
  ],
  declarations: [BoughtComponent, PreviewComponent, ConfirmedComponent],
  exports:[RouterModule],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }]
})
export class BoughtModule { }
