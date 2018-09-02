import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarsComponent } from './cars.component';
import { CarEditComponent } from './car-edit/car-edit.component';


const routes: Routes = [
  { path: '',
    component: CarsComponent,
    children: [
      { path: '',    component: CarListComponent },
      { path: 'new',    component: CarEditComponent },
      { path: ':id',    component: CarEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule {}