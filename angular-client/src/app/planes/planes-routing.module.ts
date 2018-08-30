import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanesComponent } from "./planes.component";
import { PlaneListComponent } from "./plane-list/plane-list.component";

const routes: Routes = [
  {
    path: "",
    component: PlanesComponent,
    children: [{ path: "", component: PlaneListComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule {}
