import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriverInfoDto } from '../../shared/models/driverInfoDto';

@Component({
  selector: 'app-admin-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver.html',
  styleUrl: './driver.css'
})
export class Driver implements OnInit {
  activeDrivers: DriverInfoDto[] = [];
  inactiveDrivers: DriverInfoDto[] = [];
  isLoading = signal<boolean>(true);

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.isLoading.set(true);
    
    // Adjust this endpoint based on your backend API route
    this.http.get<DriverInfoDto[]>(`${environment.apiUrls.admin}/Driver/get-drivers`).subscribe({
      next: (res) => {
        // Split drivers into Active and Inactive lists
        this.activeDrivers = res.filter(d => d.isActive);
        this.inactiveDrivers = res.filter(d => !d.isActive);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.snackBar.open(`Error loading drivers: ${err.message}`, 'Close', { duration: 3000 });
      }
    });
  }

  toggleDriverStatus(driverId: number, activate: boolean) {
    const action = activate ? 'activate' : 'deactivate';
    
    // Adjust this endpoint based on your backend API route
    this.http.post(`${environment.apiUrls.admin}/Driver/${action}-driver/${driverId}`, {}).subscribe({
      next: () => {
        this.snackBar.open(`Driver account ${activate ? 'activated' : 'deactivated'} successfully.`, 'Close', { duration: 3000 });
        this.loadDrivers(); // Refresh lists
      },
      error: (err) => {
        this.snackBar.open(`Error updating driver status: ${err.message}`, 'Close', { duration: 3000 });
      }
    });
  }
}