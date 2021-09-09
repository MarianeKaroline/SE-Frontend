import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BoughtComponent } from './bought.component';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

const routes: Routes = [
  {
    path: "preview",
    component: PreviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [BoughtComponent, PreviewComponent],
  exports:[RouterModule],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }]
})
export class BoughtModule { }
