import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  totalRecords: number;
  page: string;

  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listBooks();
  }

  listBooks(page: string = '0') {
    this.page = page;
    this.bookService
      .getBooksPage(page)
      .then(res => {
        this.books = res.content;
        this.totalRecords = res.totalElements;
      })
      .catch(err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      });
  }

  paginate(event) {
    this.listBooks(event.page);
  }

  deleteBook(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteBook(id);
      }
    });
  }

  onConfirmDeleteBook(id: string) {
    this.bookService.deleteBook(id)
      .then(res => {
        console.log(res);
        this.listBooks(this.page);
      })
      .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
  }

  onReject() {}
}
