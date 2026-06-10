import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { adminLoginDto } from '../../shared/models/adminLoginDto';
import { environment } from '../../shared/environments/environment';
import { authResponseDto } from '../../shared/models/authResponseDto';
import { AuthService } from '../../shared/auth-service/auth-service';
import { debug } from 'console';
@Component({
  selector: 'app-login',// not used because this component is loaded via routing, but it's good practice to have it for consistency
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string ='';
  password: string = '';
  isSubmitting = false;

  constructor(private router: Router, private http:HttpClient, private authService:AuthService) {}

  login(email: string, password: string): void {
    debugger
    this.isSubmitting = true;
    const dto : adminLoginDto = {
      email:email,
      password:password,
    }

    this.http.post<authResponseDto>(`${environment.apiUrls.admin}/Admin/auth/login-admin`,dto)
    .subscribe({
      next:(res) =>{
        console.log('Login response',res);

        if(res.isSuccess){
          this.authService.setToken(res.token);
          this.router.navigate(['admin/dashboard']);
        }
        else{
          alert(res.message);
        }
      },
      error:(err) => {
        console.error('Login failed',err);
      }
    });
    this.isSubmitting = false;
  }
}
