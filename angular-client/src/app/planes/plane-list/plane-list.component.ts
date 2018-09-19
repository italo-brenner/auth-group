import { Component, OnInit } from "@angular/core";
import { Plane } from "../shared/plane.model";
import { PlaneService } from "../shared/plane.service";
import { ConfirmationService } from "primeng/api";
import { AuthService } from "../../shared/service/auth.service";

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
    public authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listPlanes();
  }

  listPlanes(page: string = '0') {
    this.page = page;
    this.planeService
      .getPlanesPage(page)
      .subscribe(res => {
        this.planes = res.content;
        this.totalRecords = res.totalElements;
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
      .subscribe(res => {
        this.listPlanes(this.page);
      });
  }

  onReject() {}

}
