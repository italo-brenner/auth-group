import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesComponent } from './resources.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

const routes: Routes = [
  { path: '',
    component: ResourcesComponent,
    children: [
      { path: '',    component: ResourceListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
