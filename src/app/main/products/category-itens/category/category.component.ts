import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { CategoryModel } from '../../models/category.model';
import { ProductsService } from '../../products.service';

@UntilDestroy()
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  products: CategoryModel[] = [];

  constructor(private productService: ProductsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => this.productService.getProductCategory(params['id']));

    this.productService.categoryProducts$
      .pipe(untilDestroyed(this))
      .subscribe(products => this.products = products);
  }

}
