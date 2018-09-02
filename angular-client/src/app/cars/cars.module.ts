import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CarsComponent } from './cars.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarsRoutingModule } from './cars-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CarEditComponent } from './car-edit/car-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule,
    SharedModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    CarsComponent,
    CarListComponent,
    CarEditComponent
  ]
})
export class CarsModule { }
