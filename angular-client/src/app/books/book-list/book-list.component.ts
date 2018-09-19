import { Component, OnInit } from "@angular/core";
import { BookService } from "../shared/book.service";
import { ConfirmationService } from "primeng/api";
import { Book } from "../shared/book.model";
import { AuthService } from "../../shared/service/auth.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  books: Book[];
  totalRecords: number;
  page: string;

  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listBooks();
  }

  listBooks(page: string = "0") {
    this.page = page;
    this.bookService.getBooksPage(page).subscribe(res => {
      this.books = res.content;
      this.totalRecords = res.totalElements;
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
    this.bookService.deleteBook(id).subscribe(res => {
      this.listBooks(this.page);
    });
  }

  onReject() {}
}
