import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  notificationChange: Subject<Object> = new Subject<Object>();

  notify(severity: Severities, summary: string, detail: string) {
    this.notificationChange.next({ severity, summary, detail });
  }
}
