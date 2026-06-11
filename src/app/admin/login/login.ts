import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { adminLoginDto } from '../../shared/models/adminLoginDto';
import { environment } from '../../shared/environments/environment';
import { authResponseDto } from '../../shared/models/authResponseDto';
import { AuthService } from '../../shared/auth-service/auth-service';
import { debug } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private router: Router,
    private http:HttpClient,
    private authService:AuthService,
    private snackBar:MatSnackBar
  ) {}

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
      },
      error:(err) => {
        if(err.status == 400){
          this.snackBar.open("Invalid Login Credentials", 'Close',{duration:3000});
        }
        if(err.status == 401){
          this.snackBar.open("You are not allowed to access Admin portal", 'Close', { duration: 3000 });
          this.router.navigate(['']);
        }
        if(err.status == 500){
          this.snackBar.open("Internal Server Error", 'Close',{duration:3000 });
          this.router.navigate(['admin']);
        }
      }
    });
    this.isSubmitting = false;
  }
}
