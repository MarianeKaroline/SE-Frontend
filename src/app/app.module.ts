import { AppService } from 'src/app/app.service';
import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
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
import { ProductsService } from './main/products/products.service';
import { UserService } from './main/user/user.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CartService } from './main/cart/cart.service';
import { LayoutService } from './layout/layout.service';
import { BoughtService } from './main/bought/bought.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SwiperModule } from 'swiper/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

registerLocaleData(localePt);

const appRoutes: Routes = [
  {
    path: '',
    component: BestSellingComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./main/products/product.module').then(m => m.ProductModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'cart',
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
    path: 'assistant',
    loadChildren: () => import('./main/assistant/assistant.module').then(m => m.AssistantModule)
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
    SidenavComponent,
    FooterComponent
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
    CreditCardDirectivesModule,
    NgxQRCodeModule,
    NgxBarcodeModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    SwiperModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CookieService,
    UserService,
    BoughtService,
    LayoutService,
    ProductsService,
    AppService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
