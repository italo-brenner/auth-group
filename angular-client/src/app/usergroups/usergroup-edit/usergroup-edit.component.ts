import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserGroupService } from '../shared/usergroup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserGroup } from '../shared/usergroup.model';

@Component({
  selector: 'app-usergroup-edit',
  templateUrl: './usergroup-edit.component.html',
  styleUrls: ['./usergroup-edit.component.scss']
})
export class UserGroupEditComponent implements OnInit {

  formGroup: FormGroup;
  userGroup: UserGroup;

  constructor(
    private userGroupService: UserGroupService,
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
    const userGroupId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userGroupId) {
      this.userGroupService
        .getUserGroup(userGroupId)
        .then(userGroup => {
          this.userGroup = userGroup;
          this.formGroup.controls.name.setValue(this.userGroup.name);
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
      this.userGroup = { id: undefined, name: undefined };
    }
  }

  onSubmit(userGroup: UserGroup) {
    var confirmMessage = (this.userGroup.id) ? "Deseja modificar esse grupo?" : "Deseja criar um novo grupo?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditUserGroup(userGroup);
      }
    });
    
  }

  onConfirmEditUserGroup(userGroup: UserGroup) {
    if (this.userGroup.id) {
      userGroup.id = this.userGroup.id;
      this.userGroupService.updateUserGroup(userGroup)
        .then(() => {
          this.router.navigate(["/usergroups"]);
        })
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.userGroupService.createUserGroup(userGroup)
        .then(() => {
          this.router.navigate(["/usergroups"]);
        })
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
  }

  cancel() {
    this.location.back();
  }

}
