import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserGroupsComponent } from "./usergroups.component";
import { UserGroupListComponent } from "./usergroup-list/usergroup-list.component";
import { UserGroupEditComponent } from "./usergroup-edit/usergroup-edit.component";

const routes: Routes = [
  {
    path: "",
    component: UserGroupsComponent,
    children: [
      { path: "", component: UserGroupListComponent },
      { path: "new", component: UserGroupEditComponent },
      { path: ":id", component: UserGroupEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupsRoutingModule {}
