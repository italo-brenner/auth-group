import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './menus.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

const routes: Routes = [
  { path: '',
    component: MenusComponent,
    children: [
      { path: 'new',    component: MenuEditComponent },
      { path: ':id',    component: MenuEditComponent },
      { path: '',    component: MenuListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
