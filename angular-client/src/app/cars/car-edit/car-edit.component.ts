import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CarService } from "../shared/car.service";
import { Car } from "../shared/car.model";
import { ConfirmationService } from "primeng/api";

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
    private confirmationService: ConfirmationService
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
        .subscribe(car => {
          this.car = car;
          this.formGroup.controls.name.setValue(this.car.name);
        });
    } else {
      this.car = { id: undefined, name: undefined };
    }
  }

  onSubmit(car: Car) {
    var confirmMessage = (this.car.id) ? "Deseja modificar esse carro?" : "Deseja criar um novo carro?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditCar(car);
      }
    });
  }

  onConfirmEditCar(car: Car) {
    if (this.car.id) {
      car.id = this.car.id;
      this.carService.updateCar(car)
        .subscribe(() =>{
          this.router.navigate(["/cars"]);
        });
    } else {
      this.carService.createCar(car)
        .subscribe(() =>{
          this.router.navigate(["/cars"]);
        });
    }
  }

  cancel() {
    this.location.back();
  }
}
