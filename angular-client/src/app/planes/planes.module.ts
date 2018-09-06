import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { PlaneListComponent } from './plane-list/plane-list.component';
import { AppSharedModule } from '../shared/app-shared.module';
import { ButtonModule } from 'primeng/button';
import { PlaneEditComponent } from './plane-edit/plane-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PanelModule, InputTextModule, MessageModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    PlanesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    TableModule,
    PaginatorModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    MessageModule
  ],
  declarations: [PlanesComponent, PlaneListComponent, PlaneEditComponent]
})
export class PlanesModule { }
