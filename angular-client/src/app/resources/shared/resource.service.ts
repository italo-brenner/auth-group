import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from './resource.model';
import { UserGroup } from '../../usergroups/shared/usergroup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources() : Observable<Resource[]> {
    return this.http.get<any>('/api/resources');
  }

  getResourcesPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/resources/page', {
      params: {
        'page' : page
      }});
  }
  
  getResource(id) : Observable<Resource> {
    return this.http.get<any>('/api/resources/' + id);
  }

  createResource(resource : Resource) : Observable<any> {
    return this.http.post<any>('/api/resources', resource);
  }

  updateResource(resource : Resource) : Observable<any> {
    return this.http.put<any>('/api/resources/' + resource.id, resource);
  }

  deleteResource(id : string) : Observable<any> {
    return this.http.delete<any>('/api/resources/' + id);
  }
  
  getUserGroupFromResource(id : string) : Observable<UserGroup[]> {
    return this.http.get<any>('/api/resources/' + id + '/usergroup');
  }

  getNotUserGroupFromResource(id : string) : Observable<UserGroup[]> {
    return this.http.get<any>('/api/resources/' + id + '/notusergroup');
  }

}
