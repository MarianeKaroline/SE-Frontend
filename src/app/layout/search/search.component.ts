import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from './models/categories.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  categories: CategoriesModel[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.onCategories();
  }

  onCategories() {
    this.searchService.getCategories()
      .subscribe(category => {
        this.categories = category;
      })
  }

}
