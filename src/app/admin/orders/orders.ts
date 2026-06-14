import { HttpClient } from '@angular/common/http';
import { Component, Input, signal, Output, EventEmitter } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders :any[] = [];
  isLoading = signal<boolean>(false);

  constructor(
    private http: HttpClient,
  ){}
  getOrders(){
    // Prevent fetching again if we already have the data
    if (this.orders.length > 0) return;

    this.isLoading.set(true);
    
    this.http.get<any[]>(`${environment.apiUrls.admin}/Order/get-all-orders`).subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }
}
