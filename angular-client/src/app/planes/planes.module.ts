import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { PlaneListComponent } from './plane-list/plane-list.component';
import { AppSharedModule } from '../shared/app-shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    PlanesRoutingModule,
    AppSharedModule,
    ButtonModule
  ],
  declarations: [PlanesComponent, PlaneListComponent]
})
export class PlanesModule { }
