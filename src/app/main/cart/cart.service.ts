import { PaymentModel } from './models/payment.model';
import { TotalCartModel } from './models/totalCart.model';
import { StatusProduct } from './../../static_data/status-product.enum';
import { ListProductsModel } from './../products/models/list-products.model';
import { ProductsService } from './../products/products.service';
import { ProductCartModel } from './models/productCart.model';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable()
export class CartService {
  private static sessionId: string;
  private static verifyEmployee: boolean;

  private static _products = new BehaviorSubject<ProductCartModel[]>([]);
  public products$ = CartService._products.asObservable();

  private _added = new BehaviorSubject<boolean>(false);
  public added$ = this._added.asObservable();

  private _removed = new BehaviorSubject<boolean>(false);
  public removed$ = this._removed.asObservable();

  private static _total = new BehaviorSubject<TotalCartModel>(null);
  public total$ = CartService._total.asObservable();

  productCart: ProductCartModel = {
    productId: 0,
    name: null,
    price: 0,
    category: {
      categoryEnum: 0,
      description: null,
    },
    amount: 0,
    image: null,
    statusId: 0,
  };

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) {
    let items = JSON.parse(localStorage.getItem('items'));

    if (items == null || items == []) {
      this.getProducts();
    } else {
      CartService._products.next(items);
    }

    this._getTotal();
  }

  /* ------------------ Public  ------------------ */

  public setSessionId(id: string) {
    CartService.sessionId = id;
  }

  public setVerifyEmployee(verify: boolean) {
    CartService.verifyEmployee = verify;
  }

  public getVerifyEmployee() {
    return CartService.verifyEmployee;
  }

  public getProducts() {
    this._getProducts().subscribe((products) => {
      CartService._products.next(products);
      this._localList(products);
    });
  }

  public addProduct(productId: number) {
    let list = CartService._products.value;

    this._addToList(productId);
    this._getTotal();

    this.setSubjectAdded(true);

    if (CartService.sessionId.length == 11) {
      return this._addProduct(productId).pipe(
        tap(null, (err) => {
          list = list.filter((p) => p.productId != productId);
          this._next(list);
          this._localList(list);
        })
      );
    }

    return this._added.pipe(
      map((product) => {
        return product;
      })
    );
  }

  public removeProduct(productId: number) {
    let list = CartService._products.value;
    let product = list.find((p) => p.productId == productId);

    this._removeToList(productId);
    this._getTotal();

    if (CartService.sessionId.length == 11) {
      return this._removeProduct(productId).pipe(
        tap(null, (err) => {
          list.push(product);
          this._next(list);
          this._localList(list);
        })
      );
    }

    this._removed.next(true);

    return this._removed.pipe(
      map((product) => {
        return product;
      })
    );
  }

  public removeProducts(productId: number) {
    let list = CartService._products.value;
    let product = list.find((p) => p.productId == productId);

    list = list.filter((p) => p.productId != productId);

    this._next(list);
    this._localList(list);
    this._getTotal();

    if (CartService.sessionId.length == 11) {
      return this._removeProducts(productId).pipe(
        tap(null, (err) => {
          list.push(product);
          this._next(list);
          this._localList(list);
        })
      );
    }

    this._removed.next(true);

    return this._removed.pipe(
      map((product) => {
        return product;
      })
    );
  }

  public payment() {
    return this.http
      .get<PaymentModel[]>(`${apiUrl}/cart/payment`)
      .pipe(take(1));
  }

  public passItems() {
    let list = CartService._products.value;

    if (list.length > 0) {
      list.forEach((p) => {
        this._passItems(p.productId, p.amount).subscribe((products) => {
          this._next(list);
          this._localList(products);
        });
      });
    } else {
      this._getProducts().subscribe((products) => {
        this._next(list);
        this._localList(products);
      });
    }
  }

  public removeList() {
    this._localList([]);
    this._next([]);
    this._getTotal();
  }

  public setSubjectAdded(added: boolean) {
    this._added.next(added);
  }

  /* ------------------ Public  ------------------ */

  /* ------------------ Private ------------------ */

  private _getProducts() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart/${CartService.sessionId}`)
      .pipe(take(1));
  }

  private _addProduct(productId: number) {
    return this.http
      .post<boolean>(
        `${apiUrl}/cart/${productId}/${CartService.sessionId}`,
        null
      )
      .pipe(take(1));
  }

  private _removeProduct(productId: number) {
    return this.http
      .delete<boolean>(`${apiUrl}/cart/${productId}/${CartService.sessionId}`)
      .pipe(take(1));
  }

  private _removeProducts(productId: number) {
    return this.http
      .delete<boolean>(
        `${apiUrl}/cart/delete/${productId}/${CartService.sessionId}`
      )
      .pipe(take(1));
  }

  private _passItems(productId: number, amount: number) {
    return this.http
      .post<ProductCartModel[]>(
        `${apiUrl}/cart/${productId}/${amount}/${CartService.sessionId}`,
        null
      )
      .pipe(take(1));
  }

  private _localList(list: ProductCartModel[]) {
    window.localStorage.setItem('items', JSON.stringify(list));
  }

  private _addToList(productId: number) {
    let product = this.productsService
      .getAll()
      .find((p) => p.productId == productId);
    let list = CartService._products.value;
    let exist = list.find((p) => p.productId == productId);

    if (exist != null) {
      let index = list.findIndex((p) => p.productId == productId);
      list[index].amount += 1;
    } else {
      list.push(this._modelProducts(product));
    }

    this._next(list);
    this._localList(list);
  }

  private _modelProducts(product: ListProductsModel) {
    return (this.productCart = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      category: {
        categoryEnum: product.category.categoryEnum,
        description: product.category.description,
      },
      amount: 1,
      image: product.image,
      statusId: StatusProduct.active,
    });
  }

  private _removeToList(productId: number) {
    let list = CartService._products.value;
    let product = list.find((p) => p.productId == productId);

    if (product.amount > 1) {
      let index = list.findIndex((p) => p.productId == productId);
      list[index].amount -= 1;
    } else {
      list = list.filter((p) => p.productId != productId);
    }

    this._next(list);
    this._localList(list);
  }

  private _getTotal() {
    let list = CartService._products.value;
    let total = this._modelTotal();

    list.forEach((t) => {
      total.totalAmount += t.amount;
      total.totalPrice += t.amount * t.price;
    });

    CartService._total.next(total);
  }

  private _modelTotal() {
    return {
      totalAmount: 0,
      totalPrice: 0,
    };
  }

  private _next(list: ProductCartModel[]) {
    CartService._products.next(list);
  }
}
