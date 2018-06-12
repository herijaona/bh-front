import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Injectable()
export class AuthguardService {
  constructor(private auth: AuthserviceService, private router: Router) {}
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
