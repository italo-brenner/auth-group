import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from './resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources() : Promise<Resource[]> {
    return this.http.get<any>('/api/resources')
      .toPromise();
  }

  getResourcesPage(page: string = '0') : Promise<any> {
    return this.http.get<any>('/api/resources/page', {
      params: {
        'page' : page
      }})
      .toPromise();
  }
  
  getResource(id) : Promise<Resource> {
    return this.http.get<any>('/api/resources/' + id)
      .toPromise();
  }

  createResource(resource : Resource) : Promise<any> {
    return this.http.post<any>('/api/resources', resource).toPromise();
  }

  updateResource(resource : Resource) : Promise<any> {
    return this.http.put<any>('/api/resources/' + resource.id, resource).toPromise();
  }

  deleteResource(id : string) : Promise<any> {
    return this.http.delete<any>('/api/resources/' + id).toPromise();
  }

}
