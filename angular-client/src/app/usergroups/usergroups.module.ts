import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsComponent } from './usergroups.component';
import { UserGroupListComponent } from './usergroup-list/usergroup-list.component';
import { UserGroupEditComponent } from './usergroup-edit/usergroup-edit.component';
import { UserGroupsRoutingModule } from './usergroups-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../shared/app-shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PanelModule, ButtonModule, InputTextModule, MessageModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    UserGroupsRoutingModule,
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
  declarations: [UserGroupsComponent, UserGroupListComponent, UserGroupEditComponent]
})
export class UserGroupsModule { }
