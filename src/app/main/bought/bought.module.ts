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
import { AllBoughtComponent } from './all-bought/all-bought.component';
import { MatSelectModule } from '@angular/material/select';
import { StatusBoughtComponent } from './status-bought/status-bought.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthEmployeeGuard } from 'src/app/shared/guards/auth-employee.guard';

registerLocaleData(localePt);

const routes: Routes = [
  {
    path: 'preview',
    component: PreviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirmed',
    component: ConfirmedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-history',
    component: ShowBoughtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-orders',
    component: AllBoughtComponent,
    canActivate: [AuthEmployeeGuard]
  },
  {
    path: 'all-orders/:id',
    component: StatusBoughtComponent,
    canActivate: [AuthEmployeeGuard]
  },
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
    MatDividerModule,
    MatSelectModule,
  ],
  declarations: [
    PreviewComponent,
    ConfirmedComponent,
    ShowBoughtComponent,
    AllBoughtComponent,
    StatusBoughtComponent,
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    BoughtService,
  ],
})
export class BoughtModule {}
