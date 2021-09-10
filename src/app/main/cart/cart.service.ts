import { StatusProduct } from './../../static_data/status-product.enum';
import { ProductsService } from './../products/products.service';
import { PaymentModel } from './models/payment.model';
import { TotalCartModel } from './models/totalCart.model';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, switchMap, filter } from 'rxjs/operators';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public stepper: MatStepper;
  private totalCart = new BehaviorSubject<TotalCartModel>(null);
  public totalCart$ = this.totalCart.asObservable();

  private productsCart = new BehaviorSubject<ProductCartModel[]>([]);
  public productsCart$ = this.productsCart.asObservable();

  private static _list: ProductCartModel[] = [];

  private sessionId: string;
  private productCart: ProductCartModel
  private total: TotalCartModel;


  constructor(private http: HttpClient,
              private productService: ProductsService) {
    let list = localStorage.getItem("itens");
    let items = JSON.parse(list);
    if (localStorage.getItem("itens") != null && localStorage.getItem("itens") != "") {
      CartService._list = items
    }

    this.sessionId = localStorage.getItem('sessionId');
    productService.addList();

    this.total = {
      totalAmount: 0,
      totalPrice: 0
    }
  }

  public getTotal() {
    this.total.totalAmount = CartService._list
    .filter(p => p.statusId === StatusProduct.active)
    .reduce((sum, current) => sum + current.amount, 0);

    this.total.totalPrice = CartService._list.filter(p => p.statusId === StatusProduct.active)
    .reduce((sum, current) => sum + (current.amount * current.price), 0);

    this.totalCart.next(this.total);

    return this._total()
      .pipe(
        tap(null, err => {
          this.totalCart.next(this.total);
        })
      );
  }

  public getProducts() {
    this.productsCart.next(CartService._list)

    return this._products()
      .pipe(
        tap(null, err => {
          this.productsCart.next(CartService._list)
        })
      );
  }

  public addProducts(id: number) {
    let index = CartService._list.findIndex(i => i.productId === id);
    let exist = index != -1;

    this.productService.products$.subscribe(product => {

      product.forEach(i => {

        let products: ProductCartModel = this.productCart;

        if (i.productId == id) {
          if (exist) {
            CartService._list[index].amount += 1
          }
          else{
            products.productId = i.productId,
            products.name = i.name,
            products.price = i.price,
            products.category = i.category,
            products.amount = 1,
            products.image = i.image,
            products.statusId = StatusProduct.active
            CartService._list.push(products);
          }
        }
      })
    });

    this.productsCart.next(CartService._list);
    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    return this._add(id)
    .pipe(
      switchMap(() => this.getTotal()),
      tap(null, err => {
        CartService._list = CartService._list.filter(p => p.productId != id);
        this.getTotal();
        this.productsCart.next(CartService._list);
      })
    );
  }

  public deleteProducts(id: number) {
    let index = CartService._list.findIndex(i => i.productId === id);
    const deleted = CartService._list[index];

    if (index != -1) {
      if (CartService._list[index].amount == 1) {
        CartService._list = CartService._list.filter(p => p.productId != id)
      }
      else {
        CartService._list[index].amount -= 1;
      }

    }
    else {
      CartService._list = CartService._list.filter(p => p.productId != id)
    }

    this.productsCart.next(CartService._list);
    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    return this._delete(id)
    .pipe(
      switchMap(() => this.getTotal()),
      tap(null, err => {
        CartService._list.push(deleted)
        this.productsCart.next(CartService._list);
      })
    );
  }

  public nextClicked() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  public getPayment() {
    return this._payment();
  }

  private _total() {
    return this.http
      .get<TotalCartModel>(`${apiUrl}/cart/total/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }

  private _products() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }

  private _add(id: number) {
    return this.http
      .post(`${apiUrl}/cart/${id}/${this.sessionId}`, null)
      .pipe(
        take(1)
      );
  }

  private _delete(id: number) {
    return this.http
      .delete(`${apiUrl}/cart/${id}/${this.sessionId}`)
      .pipe(
        take(1)
      );
  }

  private _payment() {
    return this.http
    .get<PaymentModel[]>(`${apiUrl}/cart/payment`)
    .pipe(
      take(1)
    );
  }
}
