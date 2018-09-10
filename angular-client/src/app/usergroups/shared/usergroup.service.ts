import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserGroup } from './usergroup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  getUserGroups() : Observable<UserGroup[]> {
    return this.http.get<any>('/api/usergroups');
  }

  getUserGroupsPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/usergroups/page', {
      params: {
        'page' : page
      }});
  }
  
  getUserGroup(id) : Observable<UserGroup> {
    return this.http.get<any>('/api/usergroups/' + id);
  }

  createUserGroup(userGroup : UserGroup) : Observable<any> {
    return this.http.post<any>('/api/usergroups', userGroup);
  }

  updateUserGroup(userGroup : UserGroup) : Observable<any> {
    return this.http.put<any>('/api/usergroups/' + userGroup.id, userGroup);
  }

  deleteUserGroup(id : string) : Observable<any> {
    return this.http.delete<any>('/api/usergroups/' + id);
  }
  
}
