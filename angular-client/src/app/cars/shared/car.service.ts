import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<any>('/api/cars')
      .toPromise()
      .then(res => <Car[]> res)
      .then(data => { return data; });
  }
  
  getCar(id) {
    return this.http.get<any>('/api/cars/' + id)
      .toPromise()
      .then(res => <Car> res)
      .then(data => { return data; });
  }

  createCar(car : Car) {
    this.http.post<any>('/api/cars', car).toPromise();
  }

  updateCar(car : Car) {
    this.http.put<any>('/api/cars/' + car.id, car).toPromise();
  }

  deleteCar(id : string) {
    this.http.delete<any>('/api/cars/' + id).toPromise();
  }

}
