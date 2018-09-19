import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PlaneService } from "../shared/plane.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Plane } from "../shared/plane.model";

@Component({
  selector: "app-plane-edit",
  templateUrl: "./plane-edit.component.html",
  styleUrls: ["./plane-edit.component.scss"]
})
export class PlaneEditComponent implements OnInit {
  formGroup: FormGroup;
  plane: Plane;

  constructor(
    private planeService: PlaneService,
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
    const planeId = this.activatedRoute.snapshot.paramMap.get("id");
    if (planeId) {
      this.planeService.getPlane(planeId).subscribe(plane => {
        this.plane = plane;
        this.formGroup.controls.name.setValue(this.plane.name);
      });
    } else {
      this.plane = { id: undefined, name: undefined };
    }
  }

  onSubmit(plane: Plane) {
    var confirmMessage = this.plane.id
      ? "Deseja modificar esse avião?"
      : "Deseja criar um novo avião?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditPlane(plane);
      }
    });
  }

  onConfirmEditPlane(plane: Plane) {
    if (this.plane.id) {
      plane.id = this.plane.id;
      this.planeService.updatePlane(plane).subscribe(() => {
        this.router.navigate(["/planes"]);
      });
    } else {
      this.planeService.createPlane(plane).subscribe(() => {
        this.router.navigate(["/planes"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
