import { Component, OnInit } from "@angular/core";
import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.scss"]
})
export class CarListComponent implements OnInit {
  cars: Car[];

  constructor(
    private carService: CarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.carService
      .getCars()
      .then(cars => {
        this.cars = cars;
      })
      .catch(err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      });
  }

  deleteCar(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteCar(id);
      }
    });
  }

  onConfirmDeleteCar(id: string) {
    this.carService.deleteCar(id).catch(err => {
      this.messageService.add({
        severity: "error",
        summary: err.status + " " + err.statusText,
        detail: err.message
      });
    });
    let position = this.cars.findIndex(car => car.id === id);
    if (position != -1) {
      this.cars.splice(position, 1);
    }
  }

  onReject() {}
}
