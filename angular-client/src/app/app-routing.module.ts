import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/home/home.module#HomeModule'
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module#UserModule'
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