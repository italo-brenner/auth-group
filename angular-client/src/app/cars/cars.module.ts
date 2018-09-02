import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarsRoutingModule } from './cars-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { CarEditComponent } from './car-edit/car-edit.component';
import { AppSharedModule } from '../shared/app-shared.module';
import { SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    SharedModule,
    TableModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    MessageModule
  ],
  declarations: [
    CarsComponent,
    CarListComponent,
    CarEditComponent
  ]
})
export class CarsModule { }
