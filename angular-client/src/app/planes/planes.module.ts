import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { PlaneListComponent } from './plane-list/plane-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PlanesRoutingModule,
    SharedModule
  ],
  declarations: [PlanesComponent, PlaneListComponent]
})
export class PlanesModule { }
