import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserGroup } from './usergroup.model';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  getUserGroups() : Promise<UserGroup[]> {
    return this.http.get<any>('/api/usergroups')
      .toPromise();
  }

  getUserGroupsPage(page: string = '0') : Promise<any> {
    return this.http.get<any>('/api/usergroups/page', {
      params: {
        'page' : page
      }})
      .toPromise();
  }
  
  getUserGroup(id) : Promise<UserGroup> {
    return this.http.get<any>('/api/usergroups/' + id)
      .toPromise();
  }

  createUserGroup(userGroup : UserGroup) : Promise<any> {
    return this.http.post<any>('/api/usergroups', userGroup).toPromise();
  }

  updateUserGroup(userGroup : UserGroup) : Promise<any> {
    return this.http.put<any>('/api/usergroups/' + userGroup.id, userGroup).toPromise();
  }

  deleteUserGroup(id : string) : Promise<any> {
    return this.http.delete<any>('/api/usergroups/' + id).toPromise();
  }
  
}
