import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/service/auth.service";

@Component({
  selector: "app-user-logout",
  templateUrl: "./user-logout.component.html",
  styleUrls: ["./user-logout.component.scss"]
})
export class UserLogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
