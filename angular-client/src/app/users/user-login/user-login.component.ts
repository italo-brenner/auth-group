import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formGroup: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit(user: User) {
    this.userService.login(user)
      .subscribe(response  => {
        console.log(response);
        this.userService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(["/"]);
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: error.status + " " + error.statusText,
          detail: error.message
        });
      });
  }

}
