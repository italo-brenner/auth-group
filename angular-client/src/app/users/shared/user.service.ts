import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() : Promise<User[]> {
    return this.http.get<any>('/api/applicationusers')
      .toPromise();
  }

  getUsersPage(page: string = '0') : Promise<any> {
    return this.http.get<any>('/api/applicationusers/page', {
      params: {
        'page' : page
      }})
      .toPromise();
  }
  
  getUser(id) : Promise<User> {
    return this.http.get<any>('/api/applicationusers/' + id)
      .toPromise();
  }

  createUser(user : User) : Promise<any> {
    return this.http.post<any>('/api/applicationusers', user).toPromise();
  }

  updateUser(user : User) : Promise<any> {
    return this.http.put<any>('/api/applicationusers/' + user.id, user).toPromise();
  }

  deleteUser(id : string) : Promise<any> {
    return this.http.delete<any>('/api/applicationusers/' + id).toPromise();
  }

}
