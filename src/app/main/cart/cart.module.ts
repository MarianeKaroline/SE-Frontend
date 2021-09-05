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
    ProductsCartComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgbModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
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
    }
  ],
  bootstrap: [CartComponent],
})
export class CartModule {}
