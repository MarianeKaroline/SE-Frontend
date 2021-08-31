import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'categories', component: SearchComponent },
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [SearchComponent],
})
export class LayoutModule {}
