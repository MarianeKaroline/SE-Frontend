import { CartService } from './../cart/cart.service';
import { AppService } from 'src/app/app.service';
import { CreditCardModel } from './models/credit-card.model';
import { AddressModel } from './models/address.model';
import { SignUpModel } from './models/sign-up.model';
import { ShowCardModel } from './models/showCard.model';
import { ShowAddressModel } from './models/showAddress.model';
import { take } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {
  public sessionId: string;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private cartService: CartService
  ) {
    this.sessionId = localStorage.getItem('sessionId');
    this.cartService.getId(this.sessionId);
  }

  /* ---- Public ---- */
  public login(model: {email: string, password: string}) {
    this._signIn(model).subscribe(user => {
      this.sessionId = user.cpf;
      window.localStorage.setItem('sessionId', user.cpf);
      this.cartService.getId(this.sessionId);
      this.cartService.passItems();
    });

    return this._signIn(model);
  }

  public register(model: SignUpModel) {
    return this._signUp(model);
  }

  public addAddress(model: AddressModel)
  {
    return this._addAddress(model);
  }

  public getAddresses() {
    return this._getAddresses();
  }

  public addCreditCard(model: CreditCardModel)
  {
    return this._addCreditCard(model);
  }

  public GetCreditCards() {
    return this._getCreditCards();
  }

  public LoggOut() {
    this.appService.getIpAddress();
    this.cartService.removeList();
  }
  /* ---- end Public ---- */


  /* ---- Private ---- */
  private _signIn(model: {email: string, password: string}) {
    return this.http
      .post<UserModel>(`${apiUrl}/user/signin`, model)
      .pipe(
        take(1)
      )
  }

  private _signUp(model: SignUpModel)
  {
    return this.http
      .post(`${apiUrl}/client/signup`, model)
      .pipe(
        take(1)
      )
  }

  private _addAddress(model: AddressModel)
  {
    return this.http
    .post(`${apiUrl}/client/address`, model)
    .pipe(
      take(1)
    )
  }

  private _getAddresses() {
    return this.http
    .get<ShowAddressModel[]>(`${apiUrl}/client/address/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }

  private _addCreditCard(model: CreditCardModel)
  {
    return this.http
    .post(`${apiUrl}/client/creditcard`, model)
    .pipe(
      take(1)
    )
  }

  private _getCreditCards() {
    return this.http.get<ShowCardModel[]>(`${apiUrl}/client/creditcard/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }
  /* ---- end Private ---- */
}
