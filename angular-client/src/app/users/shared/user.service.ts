import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { LocalUser } from "../../shared/model/local-user.model";
import { StorageService } from "../../shared/service/storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {

  jwtHelperService : JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>("/api/applicationusers");
  }

  getUsersPage(page: string = "0"): Observable<any> {
    return this.http.get<any>("/api/applicationusers/page", {
      params: {
        page: page
      }
    });
  }

  getUser(id): Observable<User> {
    return this.http.get<any>("/api/applicationusers/" + id);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>("/api/applicationusers", user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>("/api/applicationusers/" + user.id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>("/api/applicationusers/" + id);
  }

  login(user: User): Observable<any> {
    return this.http.post("/api/login", user, {
      observe: "response",
      responseType: "text"
    });
  }

  successfulLogin(authorizationValue: string) {
    let vToken = authorizationValue.substring(7);
    let user: LocalUser = {
      username : this.jwtHelperService.decodeToken(vToken).sub,
      role : this.jwtHelperService.decodeToken(vToken).role,
      token: vToken
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
