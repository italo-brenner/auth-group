import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserLogoutComponent } from "./user-logout/user-logout.component";
import { RoleGuardService as RoleGuard } from "../shared/service/role-guard.service";
import { AuthGuardService as AuthGuard } from "../shared/service/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      { path: "login", component: UserLoginComponent },
      {
        path: "new",
        component: UserEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT"] }
      },
      {
        path: "logout",
        component: UserLogoutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":id",
        component: UserEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT"] }
      },
      {
        path: "",
        component: UserListComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
