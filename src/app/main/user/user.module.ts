import { AddressComponent } from './client/address/address.component';
import { UserService } from './user.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CommonModule, registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, LOCALE_ID } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserComponent } from "./user.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ProfileComponent } from './client/profile/profile.component';
import { ShowAddressComponent } from '../user/client/address/show-address/show-address.component';
import { CardComponent } from '../user/client/card/card.component';
import { ShowCardComponent } from '../user/client/card/show-card/show-card.component';
import { AddressesComponent } from './client/address/addresses/addresses.component';
import { NewAddressComponent } from './client/address/new-address/new-address.component';
import { CardsComponent } from './client/card/cards/cards.component';
import { NewCardComponent } from './client/card/new-card/new-card.component';


registerLocaleData(localePt);

const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'addresses',
    component: AddressesComponent
  },
  {
    path: 'new-address',
    component: NewAddressComponent
  },
  {
    path: 'credit-cards',
    component: CardsComponent
  },
  {
    path: 'new-card',
    component: NewCardComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    ShowAddressComponent,
    ShowCardComponent,
    AddressComponent,
    CardComponent,
    AddressesComponent,
    NewAddressComponent,
    CardsComponent,
    NewCardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [
    RouterModule,
    AddressComponent,
    CardComponent,
    ShowAddressComponent,
    ShowCardComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [UserComponent],
})
export class UserModule { }
