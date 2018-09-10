import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from './menu.model';
import { UserGroup } from '../../usergroups/shared/usergroup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenus() : Observable<Menu[]> {
    return this.http.get<any>('/api/menus');
  }

  getMenusPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/menus/page', {
      params: {
        'page' : page
      }});
  }
  
  getMenu(id) : Observable<Menu> {
    return this.http.get<any>('/api/menus/' + id);
  }

  createMenu(menu : Menu) : Observable<any> {
    return this.http.post<any>('/api/menus', menu);
  }

  updateMenu(menu : Menu) : Observable<any> {
    return this.http.put<any>('/api/menus/' + menu.id, menu);
  }

  deleteMenu(id : string) : Observable<any> {
    return this.http.delete<any>('/api/menus/' + id);
  }
  
  getUserGroupFromMenu(id : string) : Observable<UserGroup[]> {
    return this.http.get<any>('/api/menus/' + id + '/usergroup');
  }

  getNotUserGroupFromMenu(id : string) : Observable<UserGroup[]> {
    return this.http.get<any>('/api/menus/' + id + '/notusergroup');
  }

}
