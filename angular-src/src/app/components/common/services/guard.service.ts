import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate() {
    if(this.authService.isLoggedIn()) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }

}
