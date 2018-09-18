import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public authService: AuthService, public router: Router) {}

  canLoad(route: Route): boolean {
    
    const expectedRole = route.data.expectedRole;
    console.log(this.authService.isAuthenticated());
    console.log(this.authService.hasRoles(expectedRole));
    if (
      !this.authService.isAuthenticated() ||
      !this.authService.hasRoles(expectedRole)
    ) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
