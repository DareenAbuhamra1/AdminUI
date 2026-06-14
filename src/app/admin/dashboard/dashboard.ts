import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activeSection: 'drivers' | 'orders' | null = null;
  
  showDrivers() {
    this.activeSection = 'drivers';
  }

  showOrders() {
    this.activeSection = 'orders';
  }
}
