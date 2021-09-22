import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListProductsModel } from '../models/list-products.model';

@UntilDestroy()
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  products: ListProductsModel[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.products$
      .pipe(untilDestroyed(this))
      .subscribe(res => this.products = res);
  }

  editAvailable(productId: number, available: boolean) {
    this.productsService.editAvailable(productId, available)
      .pipe(untilDestroyed(this))
      .subscribe(res => console.log(res));
  }
}
