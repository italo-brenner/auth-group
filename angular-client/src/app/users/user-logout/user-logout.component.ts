import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-logout",
  templateUrl: "./user-logout.component.html",
  styleUrls: ["./user-logout.component.scss"]
})
export class UserLogoutComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
