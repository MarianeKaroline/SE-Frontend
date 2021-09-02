import { ProductSelectedModel } from './models/ProductSelected.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { BestSellingModel } from "./models/bestSelling.model";
import { CategoryModel } from './models/category.model';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
  public categoryId: number;

  private products = new BehaviorSubject<BestSellingModel[]>([]);
  public products$ = this.products.asObservable();

  private categoryProduct = new BehaviorSubject<CategoryModel[]>([]);
  public categoryProduct$ = this.categoryProduct.asObservable();

  private selectedProduct = new BehaviorSubject<ProductSelectedModel[]>([]);
  public selectedProduct$ = this.selectedProduct.asObservable();

  constructor(private http: HttpClient) {}

  public getBestSelling() {
    return this.bestSelling();
  }

  public getCategory(id: number) {
    return this.category(id);
  }

  public getSelected(id: number) {
    return this.selected(id);
  }

  private bestSelling() {
    return this.http
      .get<BestSellingModel[]>(`${apiUrl}/product`)
      .pipe(
        take(1)
      );
  }

  private category(id: number) {
    return this.http
      .get<CategoryModel[]>(`${apiUrl}/product/category/${id}`)
      .pipe(
        take(1)
      );
  }

  private selected(id: number) {
    return this.http
      .get<ProductSelectedModel>(`${apiUrl}/product/${id}`)
      .pipe(
        take(1)
      );
  }
}
