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
  totalRecords: number;
  page: string;

  constructor(
    private carService: CarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listCars();
  }

  listCars(page: string = '0') {
    this.page = page;
    this.carService
      .getCarsPage(page)
      .then(res => {
        this.cars = res.content;
        this.totalRecords = res.totalElements;
      })
      .catch(err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      });
  }

  paginate(event) {
    this.listCars(event.page);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
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
      .then(res => {
        console.log(res);
        this.listCars(this.page);
      })
      .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
  }

  onReject() {}
}
