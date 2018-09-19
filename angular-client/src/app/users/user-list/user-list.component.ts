import { Component, OnInit } from '@angular/core';
import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  totalRecords: number;
  page: string;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers(page: string = '0') {
    this.page = page;
    this.userService
      .getUsersPage(page)
      .subscribe(response => {
        this.users = response.content;
        this.totalRecords = response.totalElements;
      });
  }

  paginate(event) {
    this.listUsers(event.page);
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteUser(id);
      }
    });
  }

  onConfirmDeleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.listUsers(this.page);
      });
  }

  onReject() {}

}
