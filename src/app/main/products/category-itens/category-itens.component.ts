import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Component({
  selector: 'app-category-itens',
  templateUrl: './category-itens.component.html',
  styleUrls: ['./category-itens.component.scss']
})
export class CategoryItensComponent implements OnInit {

  products: CategoryModel[] = [];
  categoryId: number;
  id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
