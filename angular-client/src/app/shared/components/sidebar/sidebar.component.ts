import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../../app.component";
import { MenuService } from "../../../menus/shared/menu.service";
import { Menu } from "../../../menus/shared/menu.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menus: Menu[];

  constructor(
    public app: AppComponent,
    private menuService: MenuService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.menuService.getMenus().subscribe(
      response => {
        this.menus = response;
      },
      err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      }
    );
  }
}
