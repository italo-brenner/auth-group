import { Component, OnInit } from "@angular/core";
import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.scss"]
})
export class CarListComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().then(cars => {
      this.cars = cars;
    });
  }

  deleteCar(id: string) {
    this.carService.deleteCar(id);
    let position = this.cars.findIndex(car => car.id === id);
    if (position != -1) {
      this.cars.splice(position, 1);
    }
  }
}
