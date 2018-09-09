import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResourcesRoutingModule } from "./resources-routing.module";
import { ResourcesComponent } from "./resources.component";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { AppSharedModule } from "../shared/app-shared.module";
import { TableModule } from "primeng/table";
import {
  PaginatorModule,
  ButtonModule,
  MessageModule,
  InputTextModule,
  PanelModule,
  PickListModule
} from "primeng/primeng";
import { ResourceEditComponent } from "./resource-edit/resource-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResourcesRoutingModule,
    AppSharedModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    MessageModule,
    PickListModule
  ],
  declarations: [
    ResourcesComponent,
    ResourceListComponent,
    ResourceEditComponent
  ]
})
export class ResourcesModule {}
