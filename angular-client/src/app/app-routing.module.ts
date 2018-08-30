import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { LoginComponent } from './user/login/login.component';
import { CarComponent } from './car/car.component';
import { BookComponent } from './book/book.component';
import { PlaneComponent } from './plane/plane.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'cars',
    component: CarComponent
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'planes',
    component: PlaneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }