import { StatusBought } from './../../static_data/status-bought.enum';
import { BoughtModel } from './models/bought.model';
import { CartService } from './../cart/cart.service';
import { UserService } from './../user/user.service';
import { take } from 'rxjs/operators';
import { BuyModel } from './../cart/models/buy.model';
import { PreviewBoughtModel } from './models/previewBought.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class BoughtService {

  private static paymentId: number;
  private static creditCardId: number;
  private static addressId: number;
  public sessionId: string;

  model: BuyModel;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.userService.sessionId.subscribe(res => this.sessionId = res);
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

  public getBoughtStatus(status: StatusBought) {
    return this._getOrderStatus(status);
  }

  public setPaymentId(paymentId: number) {
    BoughtService.paymentId = paymentId;
  }

  public setCreditCardId(creditCardId: number) {
    BoughtService.creditCardId = creditCardId;
  }

  public setAddressId(addressId: number) {
    BoughtService.addressId = addressId
  }

  private _preview() {
    this.model = {
      paymentId: BoughtService.paymentId,
      creditCardId: BoughtService.creditCardId,
      addressId: BoughtService.addressId,
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
      paymentId: BoughtService.paymentId,
      creditCardId: BoughtService.creditCardId,
      addressId: BoughtService.addressId,
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
    );
  }

  private _getOrderStatus(status: StatusBought) {
    return this.http
    .get<BoughtModel[]>(`${apiUrl}/bought/${status}`)
    .pipe(
      take(1)
    );
  }
}
