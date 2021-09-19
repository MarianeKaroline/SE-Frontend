import { StatusBought } from './../../static_data/status-bought.enum';
import { BoughtModel } from './models/bought.model';
import { CartService } from './../cart/cart.service';
import { UserService } from './../user/user.service';
import { take, tap } from 'rxjs/operators';
import { BuyModel } from './../cart/models/buy.model';
import { PreviewBoughtModel } from './models/previewBought.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable()
export class BoughtService {

  private _allBought = new BehaviorSubject<BoughtModel[]>([]);
  public allBought$ = this._allBought.asObservable();

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
    this.getAll();
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
    this.http
      .get<BoughtModel[]>(`${apiUrl}/bought/allboughts`)
      .pipe(
        take(1)
      )
      .subscribe(res => this._allBought.next(res));
  }

  public rating(productId: number, rating: number) {
    return this.http
      .put<boolean>(`${apiUrl}/product/${productId}/${rating}`, null)
      .pipe(
        take(1)
      );
  }

  public putStatus(boughtId: number, status: StatusBought) {
    return this.http
      .put<StatusBought>(`${apiUrl}/bought/${boughtId}/${status}`, null)
      .pipe(
        tap(() => this.getAll()),
        take(1)
      );
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
