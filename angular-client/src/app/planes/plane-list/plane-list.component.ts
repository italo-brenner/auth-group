import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../shared/components/notification/notification.service";

@Component({
  selector: "app-plane-list",
  templateUrl: "./plane-list.component.html",
  styleUrls: ["./plane-list.component.scss"]
})
export class PlaneListComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  showSuccess() {
    this.notificationService.notify(
      "success",
      "Success Message",
      "Order submitted"
    );
  }
}
