import { AuthenticationService } from './../user/authentication/authentication.service';
import { UserService } from 'src/app/main/user/user.service';
import { PaymentModel } from './models/payment.model';
import { TotalCartModel } from './models/totalCart.model';
import { StatusProduct } from './../../static_data/status-product.enum';
import { ListProductsModel } from './../products/models/list-products.model';
import { ProductsService } from './../products/products.service';
import { ProductCartModel } from './models/productCart.model';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private sessionId: string;
  private verifyEmployee: boolean;

  private _products = new BehaviorSubject<ProductCartModel[]>([]);
  public products$ = this._products.asObservable();

  private _added = new BehaviorSubject<boolean>(false);
  public added$ = this._added.asObservable();

  private _removed = new BehaviorSubject<boolean>(false);
  public removed$ = this._removed.asObservable();

  private _total = new BehaviorSubject<TotalCartModel>(null);
  public total$ = this._total.asObservable();

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
    private productsService: ProductsService,
    private authService: AuthenticationService
  ) {
    let items = JSON.parse(localStorage.getItem('items'));

    this.authService.employee.subscribe(
      (employee) => (this.verifyEmployee = employee)
    );

    this.authService.sessionId.subscribe(
      (session) => (this.sessionId = session)
    );

    if (items == null || items != []) {
      this.getProducts();
    } else {
      this._next(items);
    }

    this._getTotal();
    this._localList();
  }

  /* ------------------ Public  ------------------ */

  public getVerifyEmployee() {
    return this.verifyEmployee;
  }

  public getProducts() {
    this._getProducts().subscribe((products) => {
      this._products.next(products);
    });
  }

  public addProduct(productId: number) {
    let list = this._products.value;

    this._addToList(productId);

    this.setSubjectAdded(true);

    if (this.sessionId.length == 11) {
      return this._addProduct(productId).pipe(
        tap(null, (err) => {
          list = list.filter((p) => p.productId != productId);
          this._next(list);
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
    let list = this._products.value;
    let product = list.find((p) => p.productId == productId);

    this._removeToList(productId);

    if (this.sessionId.length == 11) {
      return this._removeProduct(productId).pipe(
        tap(null, (err) => {
          list.push(product);
          this._next(list);
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
    let list = this._products.value;
    let product = list.find((p) => p.productId == productId);

    list = list.filter((p) => p.productId != productId);

    this._next(list);

    if (this.sessionId.length == 11) {
      return this._removeProducts(productId).pipe(
        tap(null, (err) => {
          list.push(product);
          this._next(list);
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
    let list = this._products.value;

    if (list.length > 0) {
      list.forEach((p) => {
        this._passItems(p.productId, p.amount).pipe(
          tap((products) => {
            this._next(products);
          })
        )
        .subscribe();
      });
    } else {
      this._getProducts().pipe(
        tap((products) => this._next(products))
      )
      .subscribe();
    }
  }

  public removeList() {
    this._next([]);
  }

  public setSubjectAdded(added: boolean) {
    this._added.next(added);
  }

  /* ------------------ Public  ------------------ */

  /* ------------------ Private ------------------ */

  private _getProducts() {
    return this.http
      .get<ProductCartModel[]>(`${apiUrl}/cart/${this.sessionId}`)
      .pipe(take(1));
  }

  private _addProduct(productId: number) {
    return this.http
      .post<boolean>(`${apiUrl}/cart/${productId}/${this.sessionId}`, null)
      .pipe(take(1));
  }

  private _removeProduct(productId: number) {
    return this.http
      .delete<boolean>(`${apiUrl}/cart/${productId}/${this.sessionId}`)
      .pipe(take(1));
  }

  private _removeProducts(productId: number) {
    return this.http
      .delete<boolean>(`${apiUrl}/cart/delete/${productId}/${this.sessionId}`)
      .pipe(take(1));
  }

  private _passItems(productId: number, amount: number) {
    return this.http
      .post<ProductCartModel[]>(
        `${apiUrl}/cart/${productId}/${amount}/${this.sessionId}`,
        null
      )
      .pipe(take(1));
  }

  private _localList() {
    this.products$.subscribe((list) => {
      console.log(list);
      window.localStorage.setItem('items', JSON.stringify(list));
    });
  }

  private _addToList(productId: number) {
    let product = this.productsService
      .getAll()
      .find((p) => p.productId == productId);

    let list = this._products.value;
    let exist = list.find((p) => p.productId == productId);

    if (exist != null) {
      let index = list.findIndex((p) => p.productId == productId);
      list[index].amount += 1;
    } else {
      list.push(this._modelProducts(product));
    }

    this._next(list);
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
    let list = this._products.value;
    let product = list.find((p) => p.productId == productId);

    if (product.amount > 1) {
      let index = list.findIndex((p) => p.productId == productId);
      list[index].amount -= 1;
    } else {
      list = list.filter((p) => p.productId != productId);
    }

    this._next(list);
  }

  private _getTotal() {
    this.products$.subscribe((p) => {
      let list = p;
      let total = this._modelTotal();

      list.forEach((t) => {
        total.totalAmount += t.amount;
        total.totalPrice += t.amount * t.price;
      });

      this._total.next(total);
    });
  }

  private _modelTotal() {
    return {
      totalAmount: 0,
      totalPrice: 0,
    };
  }

  private _next(list: ProductCartModel[]) {
    this._products.next(list);
  }
}
