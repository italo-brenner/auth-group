import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../service/storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor  {
  constructor(public storage: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();

    if (localUser) {
      const authRequest = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + localUser.token
        )
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
