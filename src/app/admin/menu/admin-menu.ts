import { Component } from '@angular/core';

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
    { label: 'Manage Customers', icon: 'people', route: '/admin/customers' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' }
  ];
}