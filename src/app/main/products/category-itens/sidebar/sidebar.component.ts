import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LayoutService } from '../../../../layout/layout.service';
import { CategoriesModel } from '../../../../layout/search/models/categories.model';

@UntilDestroy()
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
    this.layoutService.getCategories()
      .pipe(untilDestroyed(this))
      .subscribe(category => this.categories = category);
  }

  redirect(id: any) {
    this.router.navigateByUrl(`/product/category/${id}`);
  }
}

