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
import { AddressComponent } from '../user/client/address/address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowAddressComponent } from '../user/client/address/show-address/show-address.component';
import { CardComponent } from '../user/client/card/card.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaymentComponent } from './payment/payment.component';
import { ShowCardComponent } from '../user/client/card/show-card/show-card.component';

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
    AddressComponent,
    ShowAddressComponent,
    CardComponent,
    PaymentComponent,
    ShowCardComponent
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
    MatDatepickerModule
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
    CartService
  ],
  bootstrap: [CartComponent],
})
export class CartModule {}
