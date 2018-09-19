import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { User } from "../shared/user.model";
import { UserGroupService } from "../../usergroups/shared/usergroup.service";
import { UserGroup } from "../../usergroups/shared/usergroup.model";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  formGroup: FormGroup;
  user: User;
  userGroups: UserGroup[];

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      userGroup: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
        this.formGroup.controls.username.setValue(this.user.username);
        this.formGroup.controls.password.setValue(this.user.password);
        this.formGroup.controls.userGroup.setValue(this.user.userGroup);
      });
    } else {
      this.user = {
        id: undefined,
        username: undefined,
        password: undefined,
        userGroup: undefined
      };
    }
    this.userGroupService.getUserGroups().subscribe(res => {
      this.userGroups = res;
    });
  }

  onSubmit(user: User) {
    var confirmMessage = this.user.id
      ? "Deseja modificar esse usuário?"
      : "Deseja criar um novo usuário?";
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
      this.userService.updateUser(user).subscribe(() => {
        this.router.navigate(["/users"]);
      });
    } else {
      this.userService.createUser(user).subscribe(() => {
        this.router.navigate(["/users"]);
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
