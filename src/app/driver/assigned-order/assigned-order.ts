import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AssignedOrderDto {
  orderId: number;
  partnerName: string;
  partnerLocation: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
  isReadyForPickup: boolean;
  subTotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPayment: number;
  startEstimation: string;
  endEstimation: string;
}

@Component({
  selector: 'app-assigned-order',
  imports: [],
  templateUrl: './assigned-order.html',
  styleUrl: './assigned-order.css',
})
export class AssignedOrder implements OnInit {
  assignedOrder: AssignedOrderDto | null = null;
  driverId: number = 0;
  isLoading = signal<boolean>(false);

  @Output() hasAssignedOrderChange = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.driverId = Number(localStorage.getItem('driverId'));
    if (this.driverId) {
      this.getAssignedOrder();
    }
  }

  getAssignedOrder() {
    this.isLoading.set(true);
    this.http.get<AssignedOrderDto>(`${environment.apiUrls.driver}/Order/get-assigned-order/${this.driverId}`).subscribe({
      next: (res) => {
        this.assignedOrder = res;
        this.isLoading.set(false);
        this.hasAssignedOrderChange.emit(!!this.assignedOrder);
      },
      error: (err) => {
        console.error('Error loading assigned order', err);
        this.assignedOrder = null;
        this.isLoading.set(false);
        this.hasAssignedOrderChange.emit(false);
      }
    });
  }

  pickUpOrder(): void {
    if (!this.assignedOrder) return;
    
    this.isLoading.set(true);
    this.http.patch<any>(`${environment.apiUrls.driver}/Order/${this.assignedOrder.orderId}/pickup/driver/${this.driverId}`, null).subscribe({
      next: (res) => {
        if (res !== false) {
          this.snackBar.open("Order picked up successfully", "Close", { duration: 3000 });
          
          this.assignedOrder = null;
          this.hasAssignedOrderChange.emit(false);
          setTimeout(() => this.getAssignedOrder(), 500); 
        }
        else {
          this.isLoading.set(false);
          this.snackBar.open("Couldn't pick up order.", "Close", { duration: 3000 });
        }
       
      },
      error: (err) => {
        console.error("Error picking up order", err);
        this.isLoading.set(false);
        this.snackBar.open("An error occurred while picking up the order.", "Close", { duration: 3000 });
      }
    });
  }
}
