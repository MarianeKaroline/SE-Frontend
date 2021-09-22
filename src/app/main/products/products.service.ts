import { AddNewProductModel } from './models/addNewProduct.model';
import { ListProductsModel } from './models/list-products.model';
import { ProductSelectedModel } from './models/ProductSelected.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from "@angular/core";
import { BestSellingModel } from "./models/bestSelling.model";
import { CategoryModel } from './models/category.model';

const apiUrl = environment.apiUrl;

@Injectable()
export class ProductsService {
  private _products = new BehaviorSubject<ListProductsModel[]>([]);
  public products$ = this._products.asObservable();

  private _categoryProducts = new BehaviorSubject<CategoryModel[]>([]);
  public categoryProducts$ = this._categoryProducts.asObservable();

  constructor(private http: HttpClient) {
    this.addList();
  }

  public getBestSelling() {
    return this.http
      .get<BestSellingModel[]>(`${apiUrl}/product`)
      .pipe(
        take(1)
      );
  }

  public getProductCategory(id: number) {
    this.http
      .get<CategoryModel[]>(`${apiUrl}/product/category/${id}`)
      .pipe(
        take(1)
      )
      .subscribe(res => this._categoryProducts.next(res));
  }

  public getSelected(id: number) {
    return this.http
      .get<ProductSelectedModel>(`${apiUrl}/product/${id}`)
      .pipe(
        take(1)
      );
  }

  public getAll() {
    return this._products.value;
  }

  public addList() {
    this._getAll()
      .subscribe(list => {
        this._products.next(list);
      });
  }

  public add(model: AddNewProductModel) {
    return this.http
      .post<boolean>(`${apiUrl}/product/newproduct`, model)
      .pipe(
        take(1)
      );
  }

  public editAvailable(productId: number, available: boolean) {
    return this.http
      .put<boolean>(`${apiUrl}/product/${productId}/${available}`, null)
      .pipe(
        tap(() => this.addList()),
        take(1)
      );
  }

  private _getAll() {
    return this.http
      .get<ListProductsModel[]>(`${apiUrl}/product/get/all`)
      .pipe(
        take(1)
      );
  }
}
