import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { User } from '../../users/shared/user.model';
import { LocalUser } from '../model/local-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService : JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

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
      exp : this.jwtHelperService.decodeToken(vToken).exp,
      token: vToken
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

  getToken(): String {
    return this.storage.getLocalUser().token;
  }

  isAuthenticated(): boolean {
    let user : LocalUser = this.storage.getLocalUser();
    if (! user ) {
      return false;
    }
    let expiryDate = new Date(0);
    const exp = user.exp;
    expiryDate.setUTCSeconds(exp);
    return expiryDate.valueOf() > new Date().valueOf();
  }

  hasRoles(roles: string[]): boolean {
    let user : LocalUser = this.storage.getLocalUser();
    for (let i=0; i < roles.length; i++) {
      if (user.role === roles[i]) {
        return true;
      }
    }
    return false;
  }

}
