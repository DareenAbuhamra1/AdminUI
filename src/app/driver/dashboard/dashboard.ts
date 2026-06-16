import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssignedOrder } from '../assigned-order/assigned-order';
import { NearestOrders } from '../nearest-orders/nearest-orders';

@Component({
  selector: 'app-dashboard',
  imports: [AssignedOrder,NearestOrders],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  driverName:string|null = '';
  hasAssignedOrder: boolean = true;
  
  @ViewChild(AssignedOrder) assignedOrder!: AssignedOrder;

  constructor(private router: Router) {}

  ngOnInit(){
    this.driverName = localStorage.getItem('driverName');
  }

  onOrderAccepted(): void {
    this.hasAssignedOrder = true;
    if (this.assignedOrder) {
      this.assignedOrder.getAssignedOrder();
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
