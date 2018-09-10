import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../shared/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Menu } from '../shared/menu.model';
import { UserGroup } from '../../usergroups/shared/usergroup.model';
import { UserGroupService } from '../../usergroups/shared/usergroup.service';


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  formGroup: FormGroup;
  menu: Menu;
  methods: SelectItem[];
  sourcelist: UserGroup[];
  targetlist: UserGroup[];

  constructor(
    private menuService: MenuService,
    private userGroupService: UserGroupService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.methods = [
      {label: 'Selecione', value:null},
      {label: 'GET', value: 'GET'},
      {label: 'HEAD', value: 'HEAD'},
      {label: 'POST', value: 'POST'},
      {label: 'PUT', value: 'PUT'},
      {label: 'PATCH', value: 'PATCH'},
      {label: 'DELETE', value: 'DELETE'},
      {label: 'OPTIONS', value: 'OPTIONS'},
      {label: 'TRACE', value: 'TRACE'}
    ];
    this.formGroup = this.formBuilder.group({
      title: ["", [Validators.required]],
      fontAwesome: ["", [Validators.required]],
      link: ["", [Validators.required]]
    });
    this.targetlist = [];
  }

  ngOnInit() {
    const menuId = this.activatedRoute.snapshot.paramMap.get("id");
    this.initPickList(menuId);
    if (menuId) {
      this.menuService
        .getMenu(menuId)
        .subscribe(menu => {
          this.menu = menu;
          this.formGroup.controls.title.setValue(this.menu.title);
          this.formGroup.controls.fontAwesome.setValue(this.menu.fontAwesome);
          this.formGroup.controls.link.setValue(this.menu.link);
        }, err => {
          if (err.status == 404) {
            this.router.navigate(["/not-found"], { replaceUrl: true });
          } else {
            this.messageService.add({
              severity: "error",
              summary: err.status + " " + err.statusText,
              detail: err.message
            });
          }
        });
    } else {
      this.menu = {
        id: undefined,
        title: undefined,
        fontAwesome: undefined,
        link: undefined
      };
    }
  }

  initPickList(id?: string) {
    if (id) {
      this.menuService.getNotUserGroupFromMenu(id)
        .subscribe(usergroup => {
          this.sourcelist = usergroup;
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
      this.menuService.getUserGroupFromMenu(id)
        .subscribe(usergroup => {
          this.targetlist = usergroup;
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    } else {
      this.userGroupService.getUserGroups()
        .subscribe(usergroup => {
          this.sourcelist = usergroup;
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
  }

  onSubmit(menu: Menu) {
    var confirmMessage = (this.menu.id) ? "Deseja modificar esse menu?" : "Deseja criar um novo menu?";
    this.confirmationService.confirm({
      message: confirmMessage,
      accept: () => {
        this.onConfirmEditMenu(menu);
      }
    });
    
  }

  onConfirmEditMenu(menu: Menu) {
    menu.listUserGroup = this.targetlist;
    if (this.menu.id) {
      menu.id = this.menu.id;
      this.menuService.updateMenu(menu)
        .subscribe(() =>{
          this.router.navigate(["/menus"]);
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
      });
    } else {
      this.menuService.createMenu(menu)
        .subscribe(() =>{
          this.router.navigate(["/menus"]);
        }, err => {
          this.messageService.add({
            severity: "error",
            summary: err.status + " " + err.statusText,
            detail: err.message
          });
        });
    }
    
  }

  cancel() {
    this.location.back();
  }

}
