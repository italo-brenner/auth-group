import { Component, OnInit } from '@angular/core';
import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";
import { ConfirmationService, MessageService } from "primeng/api";

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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers(page: string = '0') {
    this.page = page;
    this.userService
      .getUsersPage(page)
      .then(res => {
        this.users = res.content;
        this.totalRecords = res.totalElements;
      })
      .catch(err => {
        this.messageService.add({
          severity: "error",
          summary: err.status + " " + err.statusText,
          detail: err.message
        });
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
      .then(res => {
        console.log(res);
        this.listUsers(this.page);
      })
      .catch(err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
  }

  onReject() {}

}
