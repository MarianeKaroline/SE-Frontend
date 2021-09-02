import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  product: CategoryModel[] = [];
  categoryId: number;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => this.categoryId = +params['id']);

      this.productService.getCategory(this.categoryId)
        .subscribe(products => this.product = products);

        console.log(this.categoryId);

    // this.route.params
    //   .pipe(
    //     tap(params => this.categoryId = +params['id']),
    //     switchMap(() => this.onCategory())
    //   )
    //   .subscribe();
  }

  onCategory() {


    // return this.productService.getCategory(this.categoryId)
    //   .pipe(
    //     tap(product => {
    //       this.category = product;
    //     })
    //   )
  }

}
