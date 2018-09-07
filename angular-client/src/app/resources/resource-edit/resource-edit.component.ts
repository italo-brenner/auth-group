import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResourceService } from '../shared/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Resource } from '../shared/resource.model';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {

  formGroup: FormGroup;
  resource: Resource;
  methods: SelectItem[];

  constructor(
    private resourceService: ResourceService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.methods = [
      {label:'Selecione', value:null},
      {label: 'GET', value: 'GET'},
      {label: 'HEAD', value: 'HEAD'},
      {label: 'POST', value: 'POST'},
      {label: 'PUT', value: 'PUT'},
      {label: 'PATCH', value: 'PATCH'},
      {label: 'DELETE', value: 'DELETE'},
      {label: 'OPTIONS', value: 'OPTIONS'},
      {label: 'TRACE', value: 'TRACE'}
    ];
    this.formGroup = this.formBuilder.group({
      method: ["", [Validators.required]],
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const resourceId = this.activatedRoute.snapshot.paramMap.get("id");
    if (resourceId) {
      this.resourceService
        .getResource(resourceId)
        .then(resource => {
          this.resource = resource;
          this.formGroup.controls.method.setValue(this.resource.method);
          this.formGroup.controls.name.setValue(this.resource.name);
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
      this.resource = {
        id: undefined,
        method: undefined,
        name: undefined
      };
    }
  }

  onSubmit(resource: Resource) {
    var confirmMessage = (this.resource.id) ? "Deseja modificar esse recurso?" : "Deseja criar um novo recurso?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditResource(resource);
      }
    });
    
  }

  onConfirmEditResource(resource: Resource) {
    if (this.resource.id) {
      resource.id = this.resource.id;
      this.resourceService.updateResource(resource)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.resourceService.createResource(resource)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    this.router.navigate(["/resources"]);
  }

  cancel() {
    this.location.back();
  }

}
