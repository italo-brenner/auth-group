import { Component, OnInit } from '@angular/core';
import { UserGroup } from "../shared/usergroup.model";
import { UserGroupService } from "../shared/usergroup.service";
import { ConfirmationService } from "primeng/api";

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
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listUserGroups();
  }

  listUserGroups(page: string = '0') {
    this.page = page;
    this.userGroupService
      .getUserGroupsPage(page)
      .subscribe(res => {
        this.userGroups = res.content;
        this.totalRecords = res.totalElements;
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
      .subscribe(res => {
        this.listUserGroups(this.page);
      });
  }

  onReject() {}

}
