import { Component, OnInit } from "@angular/core";
import { Plane } from "../shared/plane.model";
import { PlaneService } from "../shared/plane.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-plane-list",
  templateUrl: "./plane-list.component.html",
  styleUrls: ["./plane-list.component.scss"]
})
export class PlaneListComponent implements OnInit {
  
  planes: Plane[];
  totalRecords: number;
  page: string;

  constructor(
    private planeService: PlaneService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listPlanes();
  }

  listPlanes(page: string = '0') {
    this.page = page;
    this.planeService
      .getPlanesPage(page)
      .then(res => {
        this.planes = res.content;
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
    this.listPlanes(event.page);
  }

  deletePlane(id: string) {
    this.confirmationService.confirm({
      message: "Deseja realmente apagar?",
      accept: () => {
        this.onConfirmDeletePlane(id);
      }
    });
  }

  onConfirmDeletePlane(id: string) {
    this.planeService.deletePlane(id)
      .then(res => {
        console.log(res);
        this.listPlanes(this.page);
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
