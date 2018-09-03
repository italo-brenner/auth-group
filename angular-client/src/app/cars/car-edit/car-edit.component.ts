import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CarService } from "../shared/car.service";
import { Car } from "../shared/car.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-car-edit",
  templateUrl: "./car-edit.component.html",
  styleUrls: ["./car-edit.component.scss"]
})
export class CarEditComponent implements OnInit {
  formGroup: FormGroup;
  car: Car;

  constructor(
    private carService: CarService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const carId = this.activatedRoute.snapshot.paramMap.get("id");
    if (carId) {
      this.carService
        .getCar(carId)
        .then(car => {
          this.car = car;
          this.formGroup.controls.name.setValue(this.car.name);
        })
        .catch(err => {
          if (err.status == 404) {
            this.router.navigate(["/not-found"], { replaceUrl: true });
          } else {
            this.messageService.add({
              severity: "error",
              summary: err.status + " " + err.statusText,
              detail: err.message
            });
          }
        });
    } else {
      this.car = { id: undefined, name: undefined };
    }
  }

  onSubmit(car: Car) {
    console.log(car);
    console.log(this.car);
    if (this.car.id) {
      car.id = this.car.id;
      this.carService.updateCar(car)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.carService.createCar(car)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    this.router.navigate(["/cars"]);
  }

  cancel() {
    this.location.back();
  }
}
