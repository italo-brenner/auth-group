import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<any>('/api/books');
  }

  getBooksPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/books/page', {
      params: {
        'page' : page
      }});
  }
  
  getBook(id) : Observable<Book> {
    return this.http.get<any>('/api/books/' + id);
  }

  createBook(book : Book) : Observable<any> {
    return this.http.post<any>('/api/books', book);
  }

  updateBook(book : Book) : Observable<any> {
    return this.http.put<any>('/api/books/' + book.id, book);
  }

  deleteBook(id : string) : Observable<any> {
    return this.http.delete<any>('/api/books/' + id);
  }

}
