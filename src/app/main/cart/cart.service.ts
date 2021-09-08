import { TotalCartModel } from './models/totalCart.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, switchMap } from 'rxjs/operators';
import { ProductCartModel } from './models/productCart.model';
import { CookieService } from 'ngx-cookie-service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalCart = new BehaviorSubject<TotalCartModel>(null);
  public totalCart$ = this.totalCart.asObservable();

  private productsCart = new BehaviorSubject<ProductCartModel[]>([]);
  public productsCart$ = this.productsCart.asObservable();

  private sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = localStorage.getItem('sessionId');
  }

  public getTotal() {
    return this.total()
      .pipe(
        tap(total => this.totalCart.next(total))
      );
  }

  public getProducts() {
    return this.products()
      .pipe(
        tap(products => this.productsCart.next(products))
      );
  }

  public addProducts(id: number) {
    return this.add(id)
    .pipe(
      switchMap(() => this.getProducts()),
      switchMap(() => this.getTotal())
    );
  }

  public deleteProducts(id: number) {
    return this.delete(id)
    .pipe(
      switchMap(() => this.getProducts()),
      switchMap(() => this.getTotal())
    );
  }

  private total() {
    return this.http
      .get<TotalCartModel>(`${apiUrl}/cart/total/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }

  private products() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }

  private add(id: number) {
    return this.http
      .post(`${apiUrl}/cart/${id}/${this.sessionId}`, null)
      .pipe(
        take(1)
      );
  }

  private delete(id: number) {
    return this.http
      .delete(`${apiUrl}/cart/${id}/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }
}
