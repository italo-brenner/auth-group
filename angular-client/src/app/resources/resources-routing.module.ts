import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesComponent } from './resources.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';

const routes: Routes = [
  { path: '',
    component: ResourcesComponent,
    children: [
      { path: '',    component: ResourceListComponent },
      { path: 'new',    component: ResourceEditComponent },
      { path: ':id',    component: ResourceEditComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
