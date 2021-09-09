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

  constructor(private http: HttpClient) {}

  public getBestSelling() {
    return this._bestSelling();
  }

  public getCategory(id: number) {
    return this._category(id);
  }

  public getSelected(id: number) {
    return this._selected(id);
  }

  private _bestSelling() {
    return this.http
      .get<BestSellingModel[]>(`${apiUrl}/product`)
      .pipe(
        take(1)
      );
  }

  private _category(id: number) {
    return this.http
      .get<CategoryModel[]>(`${apiUrl}/product/category/${id}`)
      .pipe(
        take(1)
      );
  }

  private _selected(id: number) {
    return this.http
      .get<ProductSelectedModel>(`${apiUrl}/product/${id}`)
      .pipe(
        take(1)
      );
  }
}
