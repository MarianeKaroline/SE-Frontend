import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../models/category.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: CategoryModel[] = [];
  id: number;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.onCategory();
  }

  onCategory() {
    this.productService.getCategory(this.id)
      .subscribe(category => {
        this.category = category
      });
  }

}
