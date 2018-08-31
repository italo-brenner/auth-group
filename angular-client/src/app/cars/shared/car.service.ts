import { Injectable } from '@angular/core';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars() {
    return <Car[]> [
      {
        id: '1',
        name: 'Volvo'
      },
      {
        id: '2',
        name: 'Gol'
      }
    ];
  }

}
