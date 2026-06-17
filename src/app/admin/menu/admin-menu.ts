import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: false,
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
})
export class AdminMenu {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Manage Domains', icon: 'language', route: '/admin/domain' },
    { label: 'Manage Partners', icon: 'business', route: '/admin/partners' },
    { label: 'Manage Drivers', icon: 'local_shipping', route: '/admin/drivers' },
    { label: 'Manage Customers', icon: 'people', route: '/admin/customers' }
  ];

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']); // Adjust to '/admin/login' if needed
  }
}