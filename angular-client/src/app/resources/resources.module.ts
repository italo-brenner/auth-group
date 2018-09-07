import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { AppSharedModule } from '../shared/app-shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule, ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    AppSharedModule,
    TableModule,
    PaginatorModule,
    ButtonModule
  ],
  declarations: [ResourcesComponent, ResourceListComponent]
})
export class ResourcesModule { }
