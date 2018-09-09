import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plane } from './plane.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  constructor(private http: HttpClient) { }

  getPlanes() : Observable<Plane[]> {
    return this.http.get<any>('/api/planes');
  }

  getPlanesPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/planes/page', {
      params: {
        'page' : page
      }});
  }
  
  getPlane(id) : Observable<Plane> {
    return this.http.get<any>('/api/planes/' + id);
  }

  createPlane(plane : Plane) : Observable<any> {
    return this.http.post<any>('/api/planes', plane);
  }

  updatePlane(plane : Plane) : Observable<any> {
    return this.http.put<any>('/api/planes/' + plane.id, plane);
  }

  deletePlane(id : string) : Observable<any> {
    return this.http.delete<any>('/api/planes/' + id);
  }

}
