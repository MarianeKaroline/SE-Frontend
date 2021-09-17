import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppService } from "src/app/app.service";
import { LayoutService } from "src/app/layout/layout.service";
import { BoughtService } from "../bought/bought.service";
import { CartService } from "../cart/cart.service";
import { ProductsService } from "../products/products.service";
import { UserService } from "../user/user.service";
import { AssistantComponent } from "./assistant.component";
import { FormComponent } from './form/form.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  {
    path: "",
    component: AssistantComponent
  }
];

@NgModule({
  declarations: [
    AssistantComponent,
    FormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  exports: [
    RouterModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    },
    CartService,
    UserService,
    BoughtService,
    LayoutService,
    ProductsService,
    AppService
  ],
  bootstrap: [AssistantComponent],
})
export class AssistantModule {}
