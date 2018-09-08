import { Component, OnInit } from '@angular/core';
import { UserGroup } from "../shared/usergroup.model";
import { UserGroupService } from "../shared/usergroup.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-usergroup-list',
  templateUrl: './usergroup-list.component.html',
  styleUrls: ['./usergroup-list.component.scss']
})
export class UserGroupListComponent implements OnInit {
  
  userGroups: UserGroup[];
  totalRecords: number;
  page: string;

  constructor(
    private userGroupService: UserGroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listUserGroups();
  }

  listUserGroups(page: string = '0') {
    this.page = page;
    this.userGroupService
      .getUserGroupsPage(page)
      .then(res => {
        this.userGroups = res.content;
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
    this.listUserGroups(event.page);
  }

  deleteUserGroup(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteUserGroup(id);
      }
    });
  }

  onConfirmDeleteUserGroup(id: string) {
    this.userGroupService.deleteUserGroup(id)
      .then(res => {
        console.log(res);
        this.listUserGroups(this.page);
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
