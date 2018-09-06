import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks() : Promise<Book[]> {
    return this.http.get<any>('/api/books')
      .toPromise();
  }

  getBooksPage(page: string = '0') : Promise<any> {
    return this.http.get<any>('/api/books/page', {
      params: {
        'page' : page
      }})
      .toPromise();
  }
  
  getBook(id) : Promise<Book> {
    return this.http.get<any>('/api/books/' + id)
      .toPromise();
  }

  createBook(book : Book) : Promise<any> {
    return this.http.post<any>('/api/books', book).toPromise();
  }

  updateBook(book : Book) : Promise<any> {
    return this.http.put<any>('/api/books/' + book.id, book).toPromise();
  }

  deleteBook(id : string) : Promise<any> {
    return this.http.delete<any>('/api/books/' + id).toPromise();
  }

}
