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
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service'
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { BestSellingComponent } from './main/products/best-selling/best-selling.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavComponent } from './main/cart/sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreditCardDirectivesModule } from 'angular-cc-library';

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
    path: 'user',
    loadChildren: () => import('./main/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'bought',
    loadChildren: () => import('./main/bought/bought.module').then(m => m.BoughtModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
      enableTracing: false,
      onSameUrlNavigation: 'reload'
    }),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CreditCardDirectivesModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
