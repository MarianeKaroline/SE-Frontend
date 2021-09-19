import { DeleteDialog } from 'src/app/shared/dialogs/delete/delete.dialog';
import { AppService } from 'src/app/app.service';
import { AppModule } from './../../app.module';
import { UserService } from 'src/app/main/user/user.service';
import { BoughtService } from './../bought/bought.service';
import { LayoutService } from './../../layout/layout.service';
import { CartService } from './cart.service';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData, CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, LOCALE_ID } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import localePt from '@angular/common/locales/pt';
import { CartComponent } from "./cart.component";
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaymentComponent } from './payment/payment.component';
import { UserModule } from '../user/user.module';
import { ProductsService } from '../products/products.service';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localePt);

const routes: Routes = [
  {
    path: "",
    component: CartComponent,
    children: [
      { path: "product/:id", component: ProductsCartComponent }
    ]
  }
];

@NgModule({
  declarations: [
    CartComponent,
    ProductsCartComponent,
    PaymentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgbModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    UserModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    },
    CartService,
    UserService,
    BoughtService,
    LayoutService,
    ProductsService,
    AppService
  ],
  bootstrap: [CartComponent],
  entryComponents: [DeleteDialog]
})
export class CartModule {}
