import { LayoutService } from '../layout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesModel } from './models/categories.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  categories: CategoriesModel[] = [];

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.onCategories();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onCategories() {
    this.subscriptions.push(this.layoutService.getCategories()
      .subscribe(category => {
        this.categories = category;
      }));
  }

}
