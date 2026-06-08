import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',// not used because this component is loaded via routing, but it's good practice to have it for consistency
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login(): void {
    // simulation 
    if (this.email && this.password) {
      console.log(`Simulating login for user: ${this.email}`);
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
