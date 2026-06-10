import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoleEnum } from '../shared/enums/RoleEnum.enum';
import { environment } from '../shared/environments/environment';
import { verifyOtpDto } from '../shared/models/verifyOtpDto';
import { authResponseDto } from '../shared/models/authResponseDto';
import { AuthService } from '../shared/auth-service/auth-service';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  constructor(private route:ActivatedRoute,private http:HttpClient,private authService:AuthService){}
  otpCode:string ='';
  phone:string = '';
  inputOtp:string = '';
  role:string = '';

  
  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      this.otpCode = params['otpCode'];
      this.phone = params['phone'];
      this.role = params['role'];
    })
  }
  verifyOtp(){
    const dto : verifyOtpDto = {
      phone:this.phone,
      otpCode:this.inputOtp,
      role:this.role
    }
    if(this.role == RoleEnum.Customer.toString()){
      this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/verify-otp`,dto).subscribe({
        next : (res)=>{
          if(res.isSuccess){
            this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/login-customer`,{phone:this.phone}).subscribe({
              next : (res)=>{
                if(res.isSuccess){
                  if(res.isRegistered){
                    this.authService.setToken(res.token);
                    //navigate[Customer]
                  }
                  else{
                    //navigate[register-customer]
                  }
                }
                else{
                  alert(res.message);
                }
                
              }
            })
          }
          else{
            //send otp again??
          }
        }
      })
    }
    
  }
}
