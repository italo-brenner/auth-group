import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TopbarComponent,
    SidebarComponent
  ],
  exports: [
    TopbarComponent,
    SidebarComponent
  ]
})
export class AppSharedModule { }
