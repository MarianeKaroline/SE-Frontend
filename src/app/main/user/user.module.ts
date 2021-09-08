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
import { SignInComponent } from './form/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';
import { SignUpComponent } from './form/sign-up/sign-up.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { StyleCardComponent } from './style-card/style-card.component';


registerLocaleData(localePt);

const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
    StyleCardComponent
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
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [UserComponent],
})
export class UserModule { }
