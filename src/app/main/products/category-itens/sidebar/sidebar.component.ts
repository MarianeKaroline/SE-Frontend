import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
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
  categoryId: number;

  constructor(private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
    console.log("oi")
    this.appService.getIpAddress();

    this.onCategories();
  }

  onCategories() {
    return this.layoutService.getCategories()
      .subscribe(category => {
        this.categories = category;
      });
  }

  redirect(id: any) {
    console.log(id)
    this.router.navigate(["/product/category/", id])
  }
}

