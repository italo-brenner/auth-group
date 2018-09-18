import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanesComponent } from "./planes.component";
import { PlaneListComponent } from "./plane-list/plane-list.component";
import { PlaneEditComponent } from "./plane-edit/plane-edit.component";
import { RoleGuardService as RoleGuard } from "../shared/service/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: PlanesComponent,
    children: [
      { path: "", component: PlaneListComponent },
      {
        path: "new",
        component: PlaneEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_PLANE"] }
      },
      {
        path: ":id",
        component: PlaneEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_PLANE"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule {}
