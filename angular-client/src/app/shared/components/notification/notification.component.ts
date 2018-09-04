import { Component, OnInit, OnDestroy } from "@angular/core";
import { Message } from "primeng/api";
import { Subscription } from "rxjs";
import { NotificationService } from "./notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificationsService: NotificationService) {}

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange.subscribe(
      notification => {
        this.msgs.length = 0;
        this.msgs.push(notification);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
