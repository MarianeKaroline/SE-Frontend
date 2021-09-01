import { ProductSelectedModel } from './../models/ProductSelected.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  selected: ProductSelectedModel;
  details: string[];
  id: number;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.onSelected();
  }

  onSelected() {
    this.productService.getSelected(this.id)
      .subscribe(product => {
        this.selected = product;
        this.details = product.detail.split(";");
      });
  }
}
