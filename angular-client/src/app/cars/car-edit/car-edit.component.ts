import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car : Car;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const carId = this.activatedRoute.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getCar(carId).then(car => {
        this.car = car
      });
    }
  }

}
