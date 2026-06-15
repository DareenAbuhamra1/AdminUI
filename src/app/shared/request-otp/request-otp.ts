import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { RoleEnum } from '../enums/RoleEnum.enum';
import { environment } from '../../shared/environments/environment';
import { OtpResponseDto } from '../models/otpResponseDto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-request-otp',
  imports: [FormsModule,CommonModule],
  templateUrl: './request-otp.html',
  styleUrl: './request-otp.css',
})
export class RequestOtp {
  phone : string = '';
  otpCode:string = '';
  constructor(
    private router : Router,
    private authService : AuthService,
    private http:HttpClient
  ) {
  }
  
  requestOtp(phone:string): void {
    const role = this.authService.getRole();
    if(role){
      switch (role){
        case (RoleEnum.Customer.toString()):
          this.http.post<OtpResponseDto>(`${environment.apiUrls.customer}/Customer/auth/request-otp`,JSON.stringify(phone),{ headers: { 'Content-Type': 'application/json' } })
          .subscribe({
            next : (res)=>{
              console.log('Login response',res);
              if(res.otp)
                this.otpCode = res.otp;
                this.router.navigate(['verify-otp'],{queryParams: {otpCode:this.otpCode, phone:phone, role :role}});
            }
          });
          break;
        case RoleEnum.Driver.toString():
          this.http.post<OtpResponseDto>(`${environment.apiUrls.driver}/Driver/auth/request-otp`,JSON.stringify(phone),{ headers: { 'Content-Type': 'application/json' } })
          .subscribe({
            next : (res)=>{
              console.log('Login response',res);
              if(res.otp)
                this.otpCode = res.otp;
                this.router.navigate(['verify-otp'],{queryParams: {otpCode:this.otpCode, phone:phone, role :role}});
            }
          });
          break;
        case RoleEnum.Partner.toString():
          this.http.post<OtpResponseDto>(`${environment.apiUrls.partner}/Partner/auth/request-otp`,JSON.stringify(phone),{ headers: { 'Content-Type': 'application/json' } })
          .subscribe({
            next : (res)=>{
              console.log('Login response',res);
              if(res.otp)
                this.otpCode = res.otp;
                this.router.navigate(['verify-otp'],{queryParams: {otpCode:this.otpCode, phone:phone, role :role}});
            }
          });
          break;
        default:
          break;
      }
    }
  }
}
