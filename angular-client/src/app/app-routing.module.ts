import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { RoleGuardService as RoleGuard } from './shared/service/role-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/home/home.module#HomeModule'
  },
  {
    path: 'users',
    loadChildren: 'src/app/users/users.module#UsersModule'
  },
  {
    path: 'page1',
    loadChildren: 'src/app/page1/page1.module#Page1Module'
  },
  {
    path: 'cars',
    loadChildren: 'src/app/cars/cars.module#CarsModule'
  },
  {
    path: 'books',
    loadChildren: 'src/app/books/books.module#BooksModule'
  },
  {
    path: 'planes',
    loadChildren: 'src/app/planes/planes.module#PlanesModule'
  },
  {
    path: 'resources',
    loadChildren: 'src/app/resources/resources.module#ResourcesModule',
    canLoad: [RoleGuard],
    data: { expectedRole: ["ROLE_ROOT"] }
  },
  {
    path: 'usergroups',
    loadChildren: 'src/app/usergroups/usergroups.module#UserGroupsModule',
    canLoad: [RoleGuard],
    data: { expectedRole: ["ROLE_ROOT"] }
  },
  {
    path: 'menus',
    loadChildren: 'src/app/menus/menus.module#MenusModule'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }