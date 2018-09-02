import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<any>('/api/car')
      .toPromise()
      .then(res => {
        return <Car[]> res
      })
      .then(data => { return data; });
  }
  

}
