import { BoughtModel } from './models/bought.model';
import { CartService } from './../cart/cart.service';
import { UserService } from './../user/user.service';
import { take } from 'rxjs/operators';
import { BuyModel } from './../cart/models/buy.model';
import { PreviewBoughtModel } from './models/previewBought.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class BoughtService {

  public paymentId: number;
  public creditCardId: number;
  public addressId: number;
  public sessionId: string;

  model: BuyModel;

  constructor(private http: HttpClient,
              private userService: UserService,
              private cartService: CartService) {
    this.paymentId = cartService.paymentId;
    this.creditCardId = cartService.creditCardId;
    this.addressId = cartService.addressId;
    this.sessionId = this.userService.sessionId;
  }

  public preview() {
    return this._preview();
  }

  public addBought() {
    return this._addBought();
  }

  public show() {
    return this._show();
  }

  public getAll() {
    return this._getAll();
  }

  private _preview() {
    this.model = {
      paymentId: this.paymentId,
      creditCardId: this.creditCardId,
      addressId: this.addressId,
      sessionId: this.sessionId
    };

    return this.http
    .post<PreviewBoughtModel>(`${apiUrl}/bought/preview`, this.model)
    .pipe(
      take(1)
    );
  }

  private _addBought() {
    this.model = {
      paymentId: this.paymentId,
      creditCardId: this.creditCardId,
      addressId: this.addressId,
      sessionId: this.sessionId
    };

    return this.http
    .post(`${apiUrl}/bought/addbought`, this.model)
    .pipe(
      take(1)
    );
  }

  private _show() {
    return this.http
    .get<BoughtModel[]>(`${apiUrl}/bought/boughts/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }

  private _getAll() {
    return this.http
    .get<BoughtModel[]>(`${apiUrl}/bought/allboughts`)
    .pipe(
      take(1)
    )
  }
}
