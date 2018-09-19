import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../service/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        switch (error.status) {
            case 403:
            this.handle403();
            break;

            case 404:
            this.handle404();
            break;

            default:
            this.handleDefaultError(error);
            break;
        }
        return throwError(error);
      })
    );
  }

  handle403() {
    this.authService.logout();
    this.router.navigate(["/forbidden"], { replaceUrl: true });
  }

  handle404() {
    this.router.navigate(["/not-found"], { replaceUrl: true });
  }

  handleDefaultError(error) {
    this.messageService.add({
      severity: "error",
      summary: error.status + " " + error.statusText,
      detail: error.message
    });
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
