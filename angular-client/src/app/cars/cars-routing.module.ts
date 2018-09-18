import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CarListComponent } from "./car-list/car-list.component";
import { CarsComponent } from "./cars.component";
import { CarEditComponent } from "./car-edit/car-edit.component";
import { RoleGuardService as RoleGuard } from "../shared/service/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: CarsComponent,
    children: [
      { path: "", component: CarListComponent },
      {
        path: "new",
        component: CarEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_CAR"] }
      },
      {
        path: ":id",
        component: CarEditComponent,
        canLoad: [RoleGuard],
        data: { expectedRole: ["ROLE_ROOT", "ROLE_CAR"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule {}
