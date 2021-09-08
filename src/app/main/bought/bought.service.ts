import { take } from 'rxjs/operators';
import { BuyModel } from './../cart/models/buy.model';
import { PreviewBoughtModel } from './models/previewBought.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BoughtService {
  private previewBought = new BehaviorSubject<PreviewBoughtModel>(null);
  public previewBought$ = this.previewBought.asObservable();

  public paymentId: number;
  public creditCardId: string;
  public addressId: number;
  public sessionId: string;

  model: BuyModel

  constructor(private http: HttpClient) {}

  private preview() {
    this.model = {

      paymentId: this.paymentId,
      creditCardId: this.creditCardId,
      addressId: this.addressId,
      sessionId: this.sessionId
    };

    this.http
    .post(`${apiUrl}/bought/preview`, this.model)
    .pipe(
      take(1)
    );
  }
}
