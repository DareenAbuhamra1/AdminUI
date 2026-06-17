import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriverRegisterDto } from '../../shared/models/driverRegisterDto';

@Component({
  selector: 'app-driver-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerData: DriverRegisterDto = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: 0, 
    dateOfBirth: '',
    vehicleLicense: '',
    driverLicense: ''
  };

  isLoading = false;
  registrationSuccess = false;
  successMessage = '';

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Check for phone in router state
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['phone']) {
      this.registerData.phone = nav.extras.state['phone'];
    }

    this.route.queryParams.subscribe(params => {
      if (params['phone']) {
        this.registerData.phone = params['phone'];
      }
    });
  }

  registerDriver() {
    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.phone || 
        !this.registerData.vehicleLicense || !this.registerData.driverLicense) {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    this.http.post<any>(`${environment.apiUrls.driver}/Driver/auth/register-driver`, this.registerData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.isSuccess) {
          this.registrationSuccess = true;
          this.successMessage = res.message || 'Driver registered successfully. Your account is pending approval by an administrator.';
          this.snackBar.open(this.successMessage, 'Close', { duration: 6000 });
          this.router.navigate(['']);
        } else {
          this.snackBar.open(res.message || 'Registration failed. Please try again.', 'Close', { duration: 4000 });
        }
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.message || 'An error occurred while registering.';
        this.snackBar.open(errorMsg, 'Close', { duration: 3000 });
      }
    });
  }

}