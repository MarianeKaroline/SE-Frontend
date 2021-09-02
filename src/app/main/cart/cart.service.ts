import { TotalCartModel } from './models/totalCart.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ProductCartModel } from './models/productCart.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalCart = new BehaviorSubject<TotalCartModel>(null);
  public totalCart$ = this.totalCart.asObservable();

  private productsCart = new BehaviorSubject<ProductCartModel[]>([]);
  public productsCart$ = this.productsCart.asObservable();

  constructor(private http: HttpClient) { }

  public getTotal() {
    return this.total();
  }

  public getProducts() {
    return this.products();
  }

  public addProducts(id: number) {
    return this.add(id)
  }

  private total() {
    return this.http
      .get<TotalCartModel>(`${apiUrl}/cart/total`)
      .pipe(
        take(1)
      );
  }

  private products() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart`)
      .pipe(
        take(1)
      );
  }

  private add(id: number) {
    return this.http
      .post(`${apiUrl}/cart/${id}`, null)
      .pipe(
        take(1)
      );
  }
}
