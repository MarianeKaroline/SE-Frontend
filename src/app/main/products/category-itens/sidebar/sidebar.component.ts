import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LayoutService } from '../../../../layout/layout.service';
import { CategoriesModel } from '../../../../layout/search/models/categories.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  categories: CategoriesModel[] = [];

  constructor(private layoutService: LayoutService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.layoutService.getCategories()
      .subscribe(category => {
        this.categories = category;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  redirect(id: any) {
    this.router.navigateByUrl(`/product/category/${id}`);
  }
}

