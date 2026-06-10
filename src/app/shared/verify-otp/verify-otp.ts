import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoleEnum } from '../enums/RoleEnum.enum';
import { environment } from '../environments/environment';
import { verifyOtpDto } from '../models/verifyOtpDto';
import { authResponseDto } from '../models/authResponseDto';
import { AuthService } from '../auth-service/auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  otpCode: string = '';
  phone: string = '';
  inputOtp: string = '';
  role: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.otpCode = params['otpCode'];
      this.phone = params['phone'];
      this.role = params['role'];
    })
  }
  verifyOtp() {
    const dto: verifyOtpDto = {
      phone: this.phone,
      otpCode: this.inputOtp,
      role: Number(this.role),
    }
    if (this.role == RoleEnum.Customer.toString()) {
      this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/verify-otp`, dto).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/login-customer`, { phone: this.phone }).subscribe({
              next: (res) => {
                if (res.isSuccess && res.isRegistered && res.isActive){
                  this.authService.setToken(res.token);
                  this.router.navigate(['customer/domains']);
                }
              },
              error: (err) => {
                if (err.status === 403) {
                  this.snackBar.open("You are not allowed to access customer portal", 'Close', { duration: 3000 });
                  this.router.navigate(['']);
                }
                if (err.status === 404) {
                  this.snackBar.open("User not registered", 'Close', { duration: 3000 });
                  this.router.navigate(['register-customer'])
                }
              }
            })
          }
          else {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000
            });
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.snackBar.open("Invalid OTP or session expired", 'Close', { duration: 3000 });
            this.router.navigate(['request-otp']);
          }

          if (err.status === 403) {
            this.snackBar.open("You are not allowed to access customer portal", 'Close', { duration: 3000 });
            this.router.navigate(['']);
          }

          if (err.status === 404) {
            this.snackBar.open("User not registered", 'Close', { duration: 3000 });
            this.router.navigate(['register-customer'])
          }
        }
      })
    }

  }
}
