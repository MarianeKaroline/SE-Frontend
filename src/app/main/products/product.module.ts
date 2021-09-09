import { ProductsService } from './products.service';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './category-itens/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllComponent } from './all/all.component';
import { LOCALE_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { CategoryComponent } from './category-itens/category/category.component';
import { SelectedComponent } from './selected/selected.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProductsComponent } from './products.component';
import { CategoryItensComponent } from './category-itens/category-itens.component';

registerLocaleData(localePt);

const routes: Routes = [
  { path: "category",
    component: CategoryItensComponent,
    children: [
      {
        path: ":id",
        component: CategoryComponent
      }
    ]
  },
  { path: ':id', component: SelectedComponent },
];

@NgModule({
  declarations: [
    CategoryComponent,
    SelectedComponent,
    BestSellingComponent,
    ProductsComponent,
    AllComponent,
    CategoryItensComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgbModule,
    MatIconModule
  ],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, ProductsService],
  bootstrap: [ProductsComponent],
})
export class ProductModule {}
