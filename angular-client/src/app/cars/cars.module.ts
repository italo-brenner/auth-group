import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CarsComponent } from './cars.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarsRoutingModule } from './cars-routing.module';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule,
    TableModule
  ],
  declarations: [
    CarsComponent,
    CarListComponent
  ]
})
export class CarsModule { }
