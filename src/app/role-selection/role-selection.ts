import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { RoleEnum } from "../shared/enums/RoleEnum.enum";
import { AuthService } from "../shared/auth-service/auth-service"
@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.css',
})
export class RoleSelection {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  selectRole(role: string) {
    if (role === 'admin') {
      this.authService.setRole(RoleEnum.Admin.toString());
      this.router.navigate(['admin/login']);
    }
    else if (role === 'customer') {
      this.authService.setRole(RoleEnum.Customer.toString());
      this.router.navigate(['login']);
    }
    else if (role === 'driver') {
      this.authService.setRole(RoleEnum.Driver.toString());
      this.router.navigate(['login']);
    }
    else if (role === 'partner') {
      this.authService.setRole(RoleEnum.Partner.toString());
      this.router.navigate(['login']);
    }
  }
}
