import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaneService } from '../shared/plane.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Plane } from '../shared/plane.model';

@Component({
  selector: 'app-plane-edit',
  templateUrl: './plane-edit.component.html',
  styleUrls: ['./plane-edit.component.scss']
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const planeId = this.activatedRoute.snapshot.paramMap.get("id");
    if (planeId) {
      this.planeService
        .getPlane(planeId)
        .then(plane => {
          this.plane = plane;
          this.formGroup.controls.name.setValue(this.plane.name);
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
      this.plane = { id: undefined, name: undefined };
    }
  }

  onSubmit(plane: Plane) {
    var confirmMessage = (this.plane.id) ? "Deseja modificar esse avião?" : "Deseja criar um novo avião?";
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
      this.planeService.updatePlane(plane)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.planeService.createPlane(plane)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    this.router.navigate(["/planes"]);
  }

  cancel() {
    this.location.back();
  }

}
