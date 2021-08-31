import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllComponent } from './all/all.component';
import { LOCALE_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { CategoryComponent } from './category/category.component';
import { SelectedComponent } from './selected/selected.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProductsComponent } from './products.component';

registerLocaleData(localePt);

const routes: Routes = [
  { path: 'category/:id', component: CategoryComponent },
  { path: ':id', component: SelectedComponent },
];

@NgModule({
  declarations: [
    CategoryComponent,
    SelectedComponent,
    BestSellingComponent,
    SidebarComponent,
    ProductsComponent,
    AllComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, NgbModule],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [ProductsComponent],
})
export class ProductModule {}
