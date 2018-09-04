import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-plane-list",
  templateUrl: "./plane-list.component.html",
  styleUrls: ["./plane-list.component.scss"]
})
export class PlaneListComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  showSuccess() {
    console.log(this.messageService);
    this.messageService.add({
      severity: "success",
      summary: "Success Message",
      detail: "Order submitted"
    });
  }
}
