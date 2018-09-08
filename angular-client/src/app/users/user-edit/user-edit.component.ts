import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  formGroup: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userId) {
      this.userService
        .getUser(userId)
        .then(user => {
          this.user = user;
          this.formGroup.controls.username.setValue(this.user.username);
          this.formGroup.controls.password.setValue(this.user.password);
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
      this.user = { id: undefined, username: undefined, password: undefined };
    }
  }

  onSubmit(user: User) {
    var confirmMessage = (this.user.id) ? "Deseja modificar esse usuário?" : "Deseja criar um novo usuário?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditUser(user);
      }
    });
    
  }

  onConfirmEditUser(user: User) {
    if (this.user.id) {
      user.id = this.user.id;
      this.userService.updateUser(user)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.userService.createUser(user)
        .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    this.router.navigate(["/users"]);
  }

  cancel() {
    this.location.back();
  }

}
