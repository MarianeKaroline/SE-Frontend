import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './layout/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { BestSellingComponent } from './main/products/best-selling/best-selling.component';
import { ClientComponent } from './main/client/client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt);

const appRoutes: Routes = [
  {
    path: '',
    component: BestSellingComponent
  },
  {
    path:'product',
    loadChildren: () => import('./main/products/product.module').then(m => m.ProductModule)
  },
  {
    path:'category',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path:'cart',
    loadChildren: () => import('./main/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
      enableTracing: false
    }),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatSidenavModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
