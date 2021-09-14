import { StatusProduct } from './../../static_data/status-product.enum';
import { ProductsService } from './../products/products.service';
import { PaymentModel } from './models/payment.model';
import { TotalCartModel } from './models/totalCart.model';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, map } from 'rxjs/operators';
import { ProductCartModel } from './models/productCart.model';
import { MatStepper } from '@angular/material/stepper';

const apiUrl = environment.apiUrl;

@Injectable()
export class CartService {
  private productsCart = new BehaviorSubject<ProductCartModel[]>([]);
  private totalCart = new BehaviorSubject<TotalCartModel>(null);
  private _added = new BehaviorSubject<boolean>(false);

  private static _list: ProductCartModel[] = [];
  private static sessionId: string;

  public productsCart$ = this.productsCart.asObservable();
  public totalCart$ = this.totalCart.asObservable();
  public added$ = this._added.asObservable();

  public routeCart: boolean = false;
  public stepper: MatStepper;
  public paymentId: number;
  public creditCardId: number;
  public addressId: number;

  product: ProductCartModel = {
    productId: 0,
    name: null,
    price: 0,
    category: {
      categoryEnum: 0,
      description: null
    },
    amount: 0,
    image: null,
    statusId: 0,
  };

  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {
    let items = JSON.parse(localStorage.getItem('itens'));

    if (
      localStorage.getItem('itens') != null &&
      localStorage.getItem('itens') != ''
    )
      CartService._list = items;
    productService.addList();
  }

  /* ---- Public ---- */
  public getId(id: string) {
    CartService.sessionId = id;
  }

  public getTotal() {
    let total: TotalCartModel = {
      totalAmount: CartService._list
        .filter((p) => p.statusId === StatusProduct.active)
        .reduce((sum, current) => sum + current.amount, 0),

      totalPrice: CartService._list
        .filter((p) => p.statusId === StatusProduct.active)
        .reduce((sum, current) => sum + current.amount * current.price, 0),
    };

    this.totalCart.next(total);

    return this.totalCart.pipe(
      map((total) => {
        return total;
      })
    );
  }

  public getProducts() {
    this.productsCart.next(CartService._list);

    return this._products().pipe(
      tap(null, (err) => {
        this.productsCart.next(CartService._list);
      })
    );
  }

  public addProducts(id: number) {
    this._addList(id);

    if (!this.routeCart) {
      this._added.next(true);
    }

    this.getTotal();
    if (CartService.sessionId.length == 11) {
      return this._add(id).pipe(
        tap(null, (err) => {
          CartService._list = CartService._list.filter(
            (p) => p.productId != id
          );
          this.getTotal();
          this.productsCart.next(CartService._list);
        })
      );
    }

    return this.productsCart.pipe(
      map((product) => {
        return product;
      })
    );
  }

  public delete(id: number) {
    let product = CartService._list.find((i) => i.productId === id);

    this._remove(id, product);

    this.productsCart.next(CartService._list);
    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    this.getTotal();
    if (CartService.sessionId.length == 11) {
      return this._delete(id).pipe(
        tap(null, (err) => {
          CartService._list.push(product);
          this.productsCart.next(CartService._list);
        })
      );
    }

    return this.productsCart.pipe(
      map((product) => {
        return product;
      })
    );
  }

  public deleteProducts(id: number) {
    const product = CartService._list.find((i) => i.productId === id);
    CartService._list = CartService._list.filter((p) => p.productId != id);

    this.productsCart.next(CartService._list);
    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    this.getTotal();
    if (CartService.sessionId.length == 11) {
      return this._deleteProducts(id).pipe(
        tap(null, (err) => {
          CartService._list.push(product);
          this.productsCart.next(CartService._list);
        })
      );
    }

    return this.productsCart.pipe(
      map((product) => {
        return product;
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
      .pipe(take(1));
  }

  public passItems() {
    if (CartService._list.length > 0) {
      CartService._list.forEach((product) => {
        this._passItems(product.productId, product.amount).subscribe(
          (products) =>
            window.localStorage.setItem('itens', JSON.stringify(products))
        );
      });
    } else {
      this._products().subscribe((products) => (CartService._list = products));
    }
  }

  public removeList() {
    CartService._list = [];
  }
  /* ---- end Public --- */

  /* ---- Private ---- */
  private _products() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart/${CartService.sessionId}`)
      .pipe(take(1));
  }

  private _add(id: number) {
    return this.http
      .post(`${apiUrl}/cart/${id}/${CartService.sessionId}`, null)
      .pipe(take(1));
  }

  private _delete(id: number) {
    return this.http
      .delete(`${apiUrl}/cart/${id}/${CartService.sessionId}`)
      .pipe(take(1));
  }

  private _passItems(id: number, amount: number) {
    return this.http
      .post<ProductCartModel[]>(
        `${apiUrl}/cart/${id}/${amount}/${CartService.sessionId}`,
        null
      )
      .pipe(take(1));
  }

  private _deleteProducts(id: number) {
    return this.http
      .delete(`${apiUrl}/cart/delete/${id}/${CartService.sessionId}`)
      .pipe(take(1));
  }

  private _addList(id: number) {
    let exist = CartService._list.find((i) => i.productId === id);
    let prod = this.productService.getAll().find((i) => i.productId == id);

    if (exist != null) {
      let index = CartService._list.findIndex((i) => i.productId === id);
      CartService._list[index].amount += 1;
    } else {
      this.product = {
        productId: prod.productId,
        name: prod.name,
        price: prod.price,
        category: prod.category,
        amount: 1,
        image: prod.image,
        statusId: StatusProduct.active,
      };
      CartService._list.push(this.product);
    }

    window.localStorage.setItem('itens', JSON.stringify(CartService._list));

    this.productsCart.next(CartService._list);
  }

  private _remove(id: number, product: ProductCartModel) {
    let index = CartService._list.findIndex((i) => i.productId === id);

    if (product != null) {
      if (CartService._list[index].amount == 1)
        CartService._list = CartService._list.filter((p) => p.productId != id);
      else CartService._list[index].amount -= 1;
    } else {
      CartService._list = CartService._list.filter((p) => p.productId != id);
    }
  }
  /* ---- end Private --- */
}
