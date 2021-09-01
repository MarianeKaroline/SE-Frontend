import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoriesModel } from './search/models/categories.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private category = new BehaviorSubject<CategoriesModel[]>([]);
  public category$ = this.category.asObservable();

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.categories();
  }

  private categories() {
    return this.http
      .get<CategoriesModel[]>(apiUrl + '/product/category')
      .pipe(take(1));
  }
}
