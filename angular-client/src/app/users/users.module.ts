import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule, MessageModule, PaginatorModule } from 'primeng/primeng';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppSharedModule } from '../shared/app-shared.module';
import { TableModule } from 'primeng/table';
import { UserLogoutComponent } from './user-logout/user-logout.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
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
  declarations: [UsersComponent, UserLoginComponent, UserEditComponent, UserListComponent, UserLogoutComponent]
})
export class UsersModule { }
