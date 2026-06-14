import { HttpClient } from '@angular/common/http';
import { Component, signal, OnInit } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  isLoading = signal<boolean>(true);
  cartData: any = null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    const customerId = Number(localStorage.getItem("customerId"));

    if (!customerId) {
      this.snackBar.open("Customer ID not found. Please log in.", "Close", { duration: 3000 });
      this.isLoading.set(false);
      return;
    }

    // TODO: Update this URL to match your exact backend endpoint for fetching the cart
    this.http.get<any>(`${environment.apiUrls.customer}/Order/cart/${customerId}`).subscribe({
      next: (res) => {
        // Assuming your backend returns { data: {...}, success: true }
        this.cartData = res.data ? res.data : res;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.snackBar.open("Failed to load cart", "Close", { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  deleteCart() {
    if (!confirm("Are you sure you want to delete your cart?")) return;

    const customerId = Number(localStorage.getItem("customerId"));
    if (!customerId) return;

    this.isLoading.set(true);
    // TODO: Update this URL to match your exact backend endpoint for deleting a cart
    this.http.delete(`${environment.apiUrls.customer}/Order/cart/${customerId}`).subscribe({
      next: () => {
        this.snackBar.open("Cart deleted successfully", "Close", { duration: 3000 });
        this.cartData = null; // Clears the UI
        this.isLoading.set(false);
      },
      error: (err) => {
        this.snackBar.open("Failed to delete cart", "Close", { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  checkout() {
    // TODO: Navigate to checkout page or call checkout API
    this.snackBar.open("Proceeding to checkout...", "Close", { duration: 3000 });
  }

  goBack() {
    this.router.navigate(['/customer/domains']); 
  }
}