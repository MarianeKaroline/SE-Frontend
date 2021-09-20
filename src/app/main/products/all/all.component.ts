import { Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListProductsModel } from '../models/list-products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  products: ListProductsModel[] = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.productsService.products$
      .subscribe(res => this.products = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  editAvailable(productId: number, available: boolean) {
    this.subscriptions.push(this.productsService.editAvailable(productId, available)
      .subscribe(res => console.log(res)));

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/product/all-products']));
  }
}
