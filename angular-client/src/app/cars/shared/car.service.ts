import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() : Observable<Car[]> {
    return this.http.get<any>('/api/cars');
  }

  getCarsPage(page: string = '0') : Observable<any> {
    return this.http.get<any>('/api/cars/page', {
      params: {
        'page' : page
      }});
  }
  
  getCar(id) : Observable<Car> {
    return this.http.get<any>('/api/cars/' + id);
  }

  createCar(car : Car) : Observable<any> {
    return this.http.post<any>('/api/cars', car);
  }

  updateCar(car : Car) : Observable<any> {
    return this.http.put<any>('/api/cars/' + car.id, car);
  }

  deleteCar(id : string) : Observable<any> {
    return this.http.delete<any>('/api/cars/' + id);
  }

}
