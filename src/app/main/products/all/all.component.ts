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

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getAll()
  }

}
