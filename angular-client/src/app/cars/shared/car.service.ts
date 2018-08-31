import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<any>('http://localhost:8080/api/car')
      .toPromise()
      .then(res => {
        console.log(res);
        return <Car[]> res.data
      })
      .then(data => { return data; });
  }
  

}
