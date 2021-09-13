import { UserService } from './../user/user.service';
import { StatusProduct } from './../../static_data/status-product.enum';
import { ProductsService } from './../products/products.service';
import { PaymentModel } from './models/payment.model';
import { TotalCartModel } from './models/totalCart.model';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, switchMap, filter, map } from 'rxjs/operators';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';

const apiUrl = environment.apiUrl;

@Injectable()
export class CartService {

  private totalCart = new BehaviorSubject<TotalCartModel>(null);
  public totalCart$ = this.totalCart.asObservable();

  private _added = new BehaviorSubject<boolean>(false);
  public added$ = this._added.asObservable();

  private productsCart = new BehaviorSubject<ProductCartModel[]>([]);
  public productsCart$ = this.productsCart.asObservable();

  public routeCart: boolean = false;
  private sessionId: string;
  public stepper: MatStepper;
  private static _list: ProductCartModel[] = [];
  private static count: number = 0;


  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private userService: UserService
  ) {
    let items = JSON.parse(localStorage.getItem("itens"));

    if (localStorage.getItem("itens") != null && localStorage.getItem("itens") != "")
      CartService._list = items

    this.sessionId = userService.sessionId;
    productService.addList();
    this.passItems();
  }

  /* ---- Public ---- */
  public getTotal() {
    let total: TotalCartModel = {
      totalAmount: CartService._list
      .filter(p => p.statusId === StatusProduct.active)
      .reduce((sum, current) => sum + current.amount, 0),

      totalPrice: CartService._list
      .filter(p => p.statusId === StatusProduct.active)
      .reduce((sum, current) => sum + (current.amount * current.price), 0)
    }

    this.totalCart.next(total);

    return this.totalCart
    .pipe(
      map((total) => {
        return total
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
    let products = this.productService.getAll();
    let prod = products.find(i => i.productId == id);

    if (exist) {
      CartService._list[index].amount += 1
    }
    else {
      let product: ProductCartModel = {
        productId: prod.productId,
        name: prod.name,
        price: prod.price,
        category: prod.category,
        amount: 1,
        image: prod.image,
        statusId: StatusProduct.active
      };

      CartService._list.push(product);
    }

    window.localStorage.setItem('itens', JSON.stringify(CartService._list));
    this.productsCart.next(CartService._list);
    if (!this.routeCart) {
      this._added.next(true);
    }

    if (this.sessionId.length == 11) {
      return this._add(id)
      .pipe(
        switchMap(() => {
          return this.getTotal();
        }),
        tap(null, err => {
          CartService._list = CartService._list.filter(p => p.productId != id);
          this.getTotal();
          this.productsCart.next(CartService._list);
        })
      );
    }

    return this.productsCart
    .pipe(
      switchMap(() => {
        return this.getTotal();
      }),
      map((product) => {
        return product
      })
    );
  }

  public deleteProducts(id: number) {
    let index = CartService._list.findIndex(i => i.productId === id);
    const deleted = CartService._list[index];

    if (index != -1) {
      if (CartService._list[index].amount == 1)
        CartService._list = CartService._list.filter(p => p.productId != id)
      else
        CartService._list[index].amount -= 1;
    }
    else {
      CartService._list = CartService._list.filter(p => p.productId != id)
    }

    this.productsCart.next(CartService._list);
    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    if (this.sessionId.length == 11) {
      return this._delete(id)
      .pipe(
        switchMap(() => this.getTotal()),
        tap(null, err => {
          CartService._list.push(deleted)
          this.productsCart.next(CartService._list);
        })
      );
    }

    return this.productsCart
    .pipe(
      switchMap(() => {
        return this.getTotal();
      }),
      map((product) => {
        return product
      })
    );
  }

  public nextClicked() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  public getPayment() {
    return this.http
    .get<PaymentModel[]>(`${apiUrl}/cart/payment`)
    .pipe(
      take(1)
    );
  }

  public passItems() {
    //fazer função privada de passar itens : productId - amount


    // if (CartService.count == 0) {
    //   this.userService.session$.subscribe(id => {
    //     if (id != null && id.length == 11) {
    //       console.log("oi");
    //       CartService._list
    //       .forEach(product => {

    //       });
    //     }
    //   });
    //   CartService.count++;
    // }
  }
  /* ---- end Public --- */


  /* ---- Private ---- */
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
  /* ---- end Private --- */
}
