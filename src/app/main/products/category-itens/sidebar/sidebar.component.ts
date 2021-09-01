import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { LayoutService } from '../../../../layout/layout.service';
import { CategoriesModel } from '../../../../layout/search/models/categories.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: CategoriesModel[] = [];
  categoryId: number;

  constructor(private layoutService: LayoutService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(params => this.categoryId = +params['id']),
        switchMap(() => this.onCategories())
      )
      .subscribe();

    console.log(this.categoryId);
  }

  onCategories() {
    return this.layoutService.getCategories()
      .pipe(
        tap(category => {
          this.categories = category;
      }))
  }
}

