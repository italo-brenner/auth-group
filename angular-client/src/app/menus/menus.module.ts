import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MenusRoutingModule } from "./menus-routing.module";
import { MenuListComponent } from "./menu-list/menu-list.component";
import { MenuEditComponent } from "./menu-edit/menu-edit.component";
import { MenuService } from "./shared/menu.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "../shared/app-shared.module";
import { TableModule } from "primeng/table";
import {
  PaginatorModule,
  ButtonModule,
  PanelModule,
  InputTextModule,
  MessageModule,
  PickListModule
} from "primeng/primeng";
import { MenusComponent } from "./menus.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenusRoutingModule,
    AppSharedModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    MessageModule,
    PickListModule
  ],
  declarations: [MenusComponent, MenuListComponent, MenuEditComponent]
})
export class MenusModule {}
