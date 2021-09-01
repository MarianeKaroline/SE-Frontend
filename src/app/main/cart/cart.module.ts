import { registerLocaleData, CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, LOCALE_ID } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductsComponent } from "./products/products.component";
import localePt from '@angular/common/locales/pt';
import { CartComponent } from "./cart.component";

registerLocaleData(localePt);

const routes: Routes = [
  { path: "", component: CartComponent }
];

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [CartComponent],
})
export class CartModule {}
