import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from '../auth-service/auth-service';
//import {Htt}
@Component({
  selector: 'app-request-otp',
  imports: [FormsModule],
  templateUrl: './request-otp.html',
  styleUrl: './request-otp.css',
})
export class RequestOtp {

  phone : string = '';

  constructor(
    private router : Router,
    //private authService : AuthService
  ) {}

  requestOtp(phone:string): void {
    //http.post<verifyOtpRequest>
  }
}
