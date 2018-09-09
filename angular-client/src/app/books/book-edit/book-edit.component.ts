import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  formGroup: FormGroup;
  book: Book;

  constructor(
    private bookService: BookService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const bookId = this.activatedRoute.snapshot.paramMap.get("id");
    if (bookId) {
      this.bookService
        .getBook(bookId)
        .subscribe(book => {
          this.book = book;
          this.formGroup.controls.name.setValue(this.book.name);
        }, err => {
          if (err.status == 404) {
            this.router.navigate(["/not-found"], { replaceUrl: true });
          } else {
            this.messageService.add({
              severity: "error",
              summary: err.status + " " + err.statusText,
              detail: err.message
            });
          }
        });
    } else {
      this.book = { id: undefined, name: undefined };
    }
  }

  onSubmit(book: Book) {
    var confirmMessage = (this.book.id) ? "Deseja modifibook esse livro?" : "Deseja criar um novo livro?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditBook(book);
      }
    });
  }

  onConfirmEditBook(book: Book) {
    if (this.book.id) {
      book.id = this.book.id;
      this.bookService.updateBook(book)
        .subscribe(() =>{
          this.router.navigate(["/books"]);
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.bookService.createBook(book)
        .subscribe(() =>{
          this.router.navigate(["/books"]);
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    
  }

  cancel() {
    this.location.back();
  }

}
