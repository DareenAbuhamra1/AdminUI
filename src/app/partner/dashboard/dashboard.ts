import { Component, ViewChild } from '@angular/core';
import { PlacedOrders } from '../placed-orders/placed-orders';
import { PreparingOrders } from '../preparing-orders/preparing-orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [PlacedOrders,PreparingOrders],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private router: Router
  ){}
  @ViewChild(PreparingOrders) preparingOrders!: PreparingOrders;
  @ViewChild(PlacedOrders) placedOrders!: PlacedOrders;

  refreshPreparing() {
    if (this.preparingOrders) {
      // Wait 500ms to allow the backend database to save the new status
      setTimeout(() => {
        this.preparingOrders.fetchOrders();
      }, 500);
    }
  }

  refreshPlaced() {
    if (this.placedOrders) {
      setTimeout(() => {
        this.placedOrders.fetchOrders();
      }, 500);
    }
  }
  goToOrderHistory(){
    this.router.navigate(['partner/order-history']);
  }
}
