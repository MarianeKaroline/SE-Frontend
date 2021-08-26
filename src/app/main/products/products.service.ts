import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { BestSellingModel } from "./models/bestSelling.model";

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
  private products = new BehaviorSubject<BestSellingModel[]>([]);
  public products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  getBestSelling() {
    return this.bestSelling();
  }

  private bestSelling() {
    return this.http
      .get<BestSellingModel[]>(apiUrl + "/product")
      .pipe(
        take(1)
      );
  }
}
