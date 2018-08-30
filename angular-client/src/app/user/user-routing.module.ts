import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [{ path: "login", component: UserLoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
