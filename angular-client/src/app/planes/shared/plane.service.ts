import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plane } from './plane.model';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  constructor(private http: HttpClient) { }

  getPlanes() : Promise<Plane[]> {
    return this.http.get<any>('/api/planes')
      .toPromise();
  }

  getPlanesPage(page: string = '0') : Promise<any> {
    return this.http.get<any>('/api/planes/page', {
      params: {
        'page' : page
      }})
      .toPromise();
  }
  
  getPlane(id) : Promise<Plane> {
    return this.http.get<any>('/api/planes/' + id)
      .toPromise();
  }

  createPlane(plane : Plane) : Promise<any> {
    return this.http.post<any>('/api/planes', plane).toPromise();
  }

  updatePlane(plane : Plane) : Promise<any> {
    return this.http.put<any>('/api/planes/' + plane.id, plane).toPromise();
  }

  deletePlane(id : string) : Promise<any> {
    return this.http.delete<any>('/api/planes/' + id).toPromise();
  }

}
