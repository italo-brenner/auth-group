import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { AppSharedModule } from '../shared/app-shared.module';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    AppSharedModule
  ],
  declarations: [BooksComponent, BookListComponent]
})
export class BooksModule { }
