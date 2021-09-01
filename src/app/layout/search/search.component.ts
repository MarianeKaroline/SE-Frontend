import { LayoutService } from '../layout.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from './models/categories.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  categories: CategoriesModel[] = [];

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.onCategories();
  }

  onCategories() {
    this.layoutService.getCategories()
      .subscribe(category => {
        this.categories = category;
      })
  }

}
