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
import { LocationDto } from '../models/LocationDto';

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
    private snackBar: MatSnackBar
  ) { }


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
    switch (this.role) {
      case RoleEnum.Customer.toString():
        this.verifyCustomerOtp()
        break;
      case RoleEnum.Partner.toString():
        this.verifyPartnerOtp()
        break;
      case RoleEnum.Driver.toString():
        this.verifyDriverOtp()
        break;
    }


  }
  verifyCustomerOtp() {
    const dto: verifyOtpDto = {
      phone: this.phone,
      otpCode: this.inputOtp,
      role: Number(this.role),
    }
    this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/verify-otp`, dto).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/login-customer`, { phone: this.phone }).subscribe({
            next: (res) => {
              if (res.isSuccess && res.isRegistered && res.isActive) {
                this.authService.setToken(res.token);
                if (res.userId != null)
                  localStorage.setItem("customerId", res.userId.toString());
                this.http.get<LocationDto>(`${environment.apiUrls.customer}/Location/default/${res.userId}`).subscribe({
                  next: (res) => {
                    if (res.locationId != null)
                      localStorage.setItem("loc", res.locationId.toString());
                  },
                  error: (err) =>{
                    if(err.status == 404){
                      this.router.navigate(['location'], {queryParams: {userId:res.userId}});
                    }
                  }
              
                });
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
                this.router.navigate(['register-customer'], { queryParams: { phone: this.phone } })
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
  verifyPartnerOtp() {
    const dto: verifyOtpDto = {
      phone: this.phone,
      otpCode: this.inputOtp,
      role: Number(this.role),
    }
    this.http.post<authResponseDto>(`${environment.apiUrls.partner}/Partner/auth/verify-otp`, dto).subscribe({
      next: (res) => {
        if(res.isSuccess){
          this.http.post<authResponseDto>(`${environment.apiUrls.partner}/Partner/auth/login-partner`, { phone: this.phone }).subscribe({
            next: (res) => {
              if (res.isSuccess && res.isRegistered && res.isActive) {
                this.authService.setToken(res.token);
                if (res.userId != null)
                  localStorage.setItem("partnerId", res.userId.toString());
                this.router.navigate(['partner/dashboard']);
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
      error: (err) =>{
        if(err.status == 400){
          this.snackBar.open("Invalid OTP or session expired", 'Close', { duration: 3000 });
          this.router.navigate(['request-otp']);
        }
      }
    })
  }
  verifyDriverOtp(){
    const dto: verifyOtpDto = {
      phone: this.phone,
      otpCode: this.inputOtp,
      role: Number(this.role),
    }
    this.http.post<authResponseDto>(`${environment.apiUrls.driver}/Driver/auth/verify-otp`, dto).subscribe({
      next: (res) => {
        if(res.isSuccess){
          this.http.post<authResponseDto>(`${environment.apiUrls.driver}/Driver/auth/login-driver`, { phone: this.phone }).subscribe({
            next: (res) => {
              if (res.isSuccess && res.isRegistered && res.isActive) {
                this.authService.setToken(res.token);
                if (res.userId != null)
                  localStorage.setItem("driverId", res.userId.toString());
                localStorage.setItem('driverName',res.fullName);
                this.router.navigate(['driver/dashboard']);

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
      error: (err) =>{
        if(err.status == 400){
          this.snackBar.open("Invalid OTP or session expired", 'Close', { duration: 3000 });
          this.router.navigate(['request-otp']);
        }
      }
      
    })
  }
}
