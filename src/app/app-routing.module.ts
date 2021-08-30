import { SearchComponent } from './layout/search/search.component';
import { SelectedComponent } from './main/products/selected/selected.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestSellingComponent } from './main/products/best-selling/best-selling.component';
import { CategoryComponent } from './main/products/category/category.component';

const routes: Routes = [
  { path: '', component: BestSellingComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product/:id', component: SelectedComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
