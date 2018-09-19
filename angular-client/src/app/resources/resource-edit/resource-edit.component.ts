import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ResourceService } from "../shared/resource.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, SelectItem } from "primeng/api";
import { Resource } from "../shared/resource.model";
import { UserGroup } from "../../usergroups/shared/usergroup.model";
import { UserGroupService } from "../../usergroups/shared/usergroup.service";

@Component({
  selector: "app-resource-edit",
  templateUrl: "./resource-edit.component.html",
  styleUrls: ["./resource-edit.component.scss"]
})
export class ResourceEditComponent implements OnInit {
  formGroup: FormGroup;
  resource: Resource;
  methods: SelectItem[];
  sourcelist: UserGroup[];
  targetlist: UserGroup[];

  constructor(
    private resourceService: ResourceService,
    private userGroupService: UserGroupService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.methods = [
      { label: "Selecione", value: null },
      { label: "GET", value: "GET" },
      { label: "HEAD", value: "HEAD" },
      { label: "POST", value: "POST" },
      { label: "PUT", value: "PUT" },
      { label: "PATCH", value: "PATCH" },
      { label: "DELETE", value: "DELETE" },
      { label: "OPTIONS", value: "OPTIONS" },
      { label: "TRACE", value: "TRACE" }
    ];
    this.formGroup = this.formBuilder.group({
      method: ["", [Validators.required]],
      name: ["", [Validators.required]]
    });
    this.targetlist = [];
  }

  ngOnInit() {
    const resourceId = this.activatedRoute.snapshot.paramMap.get("id");
    this.initPickList(resourceId);
    if (resourceId) {
      this.resourceService.getResource(resourceId).subscribe(resource => {
        this.resource = resource;
        this.formGroup.controls.method.setValue(this.resource.method);
        this.formGroup.controls.name.setValue(this.resource.name);
      });
    } else {
      this.resource = {
        id: undefined,
        method: undefined,
        name: undefined
      };
    }
  }

  initPickList(id?: string) {
    if (id) {
      this.resourceService
        .getNotUserGroupFromResource(id)
        .subscribe(usergroup => {
          this.sourcelist = usergroup;
        });
      this.resourceService.getUserGroupFromResource(id).subscribe(usergroup => {
        this.targetlist = usergroup;
      });
    } else {
      this.userGroupService.getUserGroups().subscribe(usergroup => {
        this.sourcelist = usergroup;
      });
    }
  }

  onSubmit(resource: Resource) {
    var confirmMessage = this.resource.id
      ? "Deseja modificar esse recurso?"
      : "Deseja criar um novo recurso?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditResource(resource);
      }
    });
  }

  onConfirmEditResource(resource: Resource) {
    resource.listUserGroup = this.targetlist;
    if (this.resource.id) {
      resource.id = this.resource.id;
      this.resourceService.updateResource(resource).subscribe(() => {
        this.router.navigate(["/resources"]);
      });
    } else {
      this.resourceService.createResource(resource).subscribe(() => {
        this.router.navigate(["/resources"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
