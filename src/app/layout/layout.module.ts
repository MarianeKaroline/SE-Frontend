import { LayoutService } from './layout.service';
import { CartService } from './../main/cart/cart.service';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { BoughtService } from '../main/bought/bought.service';
import { ProductsService } from '../main/products/products.service';
import { UserService } from '../main/user/user.service';
import { AppService } from '../app.service';

const routes: Routes = [
  { path: 'categories', component: SearchComponent },
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [RouterModule],
  providers: [
    CartService,
    UserService,
    BoughtService,
    LayoutService,
    ProductsService,
    AppService
  ],
  bootstrap: [SearchComponent],
})
export class LayoutModule {}
