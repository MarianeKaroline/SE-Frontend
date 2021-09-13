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
              private userService: UserService) {
    this.paymentId = +localStorage.getItem("paymentId");
    this.creditCardId = +localStorage.getItem("cardId");
    this.addressId = +localStorage.getItem("addressId");
    this.sessionId = userService.sessionId;
  }

  public preview() {
    return this._preview();
  }

  public addBought() {
    return this._addBought();
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
}
