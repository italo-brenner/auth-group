import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CarService } from "../shared/car.service";
import { Car } from "../shared/car.model";

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
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const carId = this.activatedRoute.snapshot.paramMap.get("id");
    if (carId) {
      this.carService.getCar(carId)
      .then(car => {
        this.car = car;
        this.formGroup.controls.name.setValue(this.car.name);
      })
      .catch(err => {
        console.log(err);
        console.log(err.status);
        console.log(err.status == 404);
        if (err.status == 404) {
          this.router.navigate(['/not-found']);
        }
      });
    } else {
      this.car = {id: undefined, name: undefined};
    }
  }

  onSubmit(car : Car) {
    if (this.car.id) {
      car.id = this.car.id;
      this.carService.updateCar(car);
    } else {
      this.carService.createCar(car);
    }
    this.router.navigate(['/cars']);
  }

  cancel() {
    this.location.back();
  }

}
