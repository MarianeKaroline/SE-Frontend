import { Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ListProductsModel } from '../models/list-products.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  products: ListProductsModel[] = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productsService.products$
      .subscribe(res => this.products = res);
  }

  editAvailable(productId: number, available: boolean) {
    this.productsService.editAvailable(productId, available)
      .subscribe(res => console.log(res));

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/product/all-products']));
  }
}
