import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../../app.component";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {

  constructor(
    public app: AppComponent,
    public authService: AuthService
  ) {}

  ngOnInit() {
  }
}
