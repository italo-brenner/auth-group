import { Component, OnInit } from '@angular/core';
import { Resource } from "../shared/resource.model";
import { ResourceService } from "../shared/resource.service";
import { ConfirmationService } from "primeng/api";

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
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listResources();
  }

  listResources(page: string = '0') {
    this.page = page;
    this.resourceService
      .getResourcesPage(page)
      .subscribe(res => {
        this.resources = res.content;
        this.totalRecords = res.totalElements;
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
      .subscribe(res => {
        this.listResources(this.page);
      });
  }

  onReject() {}

}
