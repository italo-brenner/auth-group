import { Component, OnInit } from '@angular/core';
import { Menu } from "../shared/menu.model";
import { MenuService } from "../shared/menu.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menus: Menu[];
  totalRecords: number;
  page: string;

  constructor(
    private menuService: MenuService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listMenus();
  }

  listMenus(page: string = '0') {
    this.page = page;
    this.menuService
      .getMenusPage(page)
      .subscribe(res => {
        this.menus = res.content;
        this.totalRecords = res.totalElements;
      }, err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      });
  }

  paginate(event) {
    this.listMenus(event.page);
  }

  deleteMenu(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteMenu(id);
      }
    });
  }

  onConfirmDeleteMenu(id: string) {
    this.menuService.deleteMenu(id)
      .subscribe(res => {
        console.log(res);
        this.listMenus(this.page);
      }, err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
      });
  }

  onReject() {}

}
