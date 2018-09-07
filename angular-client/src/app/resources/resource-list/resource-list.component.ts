import { Component, OnInit } from '@angular/core';
import { Resource } from "../shared/resource.model";
import { ResourceService } from "../shared/resource.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  resources: Resource[];
  totalRecords: number;
  page: string;

  constructor(
    private resourceService: ResourceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listResources();
  }

  listResources(page: string = '0') {
    this.page = page;
    this.resourceService
      .getResourcesPage(page)
      .then(res => {
        this.resources = res.content;
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
    this.listResources(event.page);
  }

  deleteResource(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeleteResource(id);
      }
    });
  }

  onConfirmDeleteResource(id: string) {
    this.resourceService.deleteResource(id)
      .then(res => {
        console.log(res);
        this.listResources(this.page);
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
