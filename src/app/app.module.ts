import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './main/products/products.component';
import { BestSellingComponent } from './main/products/best-selling/best-selling.component';
import { CategoryComponent } from './main/products/category/category.component';
import { SelectedComponent } from './main/products/selected/selected.component';
import { AllComponent } from './main/products/all/all.component';
import { ClientComponent } from './main/client/client.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './layout/search/search.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BestSellingComponent,
    CategoryComponent,
    SelectedComponent,
    AllComponent,
    ClientComponent,
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
