import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { LayoutService } from '../../../../layout/layout.service';
import { CategoriesModel } from '../../../../layout/search/models/categories.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: CategoriesModel[] = [];

  constructor(private layoutService: LayoutService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.onCategories();
  }

  onCategories() {
    return this.layoutService.getCategories()
      .subscribe(category => {
        this.categories = category;
      });
  }

  redirect(id: any) {
    this.router.navigateByUrl(`/product/category/${id}`);
  }
}

