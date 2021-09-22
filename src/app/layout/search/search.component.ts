import { LayoutService } from '../layout.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from './models/categories.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(category => {
        this.categories = category;
      });
  }

}
