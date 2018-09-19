import { Component, OnInit } from "@angular/core";
import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";
import { ConfirmationService } from "primeng/api";
import { AuthService } from "../../shared/service/auth.service";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.scss"]
})
export class CarListComponent implements OnInit {
  cars: Car[];
  totalRecords: number;
  page: string;

  constructor(
    private carService: CarService,
    public authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listCars();
  }

  listCars(page: string = '0') {
    this.page = page;
    this.carService
      .getCarsPage(page)
      .subscribe(res => {
        this.cars = res.content;
        this.totalRecords = res.totalElements;
      });
  }

  paginate(event) {
    this.listCars(event.page);
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
    this.carService.deleteCar(id)
      .subscribe(res => {
        this.listCars(this.page);
      });
  }

  onReject() {}

}
