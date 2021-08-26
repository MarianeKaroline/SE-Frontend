import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './main/products/products.component';
import { BestSellingComponent } from './main/products/best-selling/best-selling.component';
import { CategoryComponent } from './main/products/category/category.component';
import { SelectedComponent } from './main/products/selected/selected.component';
import { AllComponent } from './main/products/all/all.component';
import { ClientComponent } from './main/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BestSellingComponent,
    CategoryComponent,
    SelectedComponent,
    AllComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
