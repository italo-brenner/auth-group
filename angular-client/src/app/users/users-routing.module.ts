import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      { path: "login", component: UserLoginComponent },
      { path: "new", component: UserEditComponent },
      { path: "logout", component: UserLogoutComponent },
      { path: ":id", component: UserEditComponent },
      { path: "", component: UserListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
