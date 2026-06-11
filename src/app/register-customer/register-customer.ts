import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerRequestDto } from '../shared/models/registerRequestDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environments/environment';
import { authResponseDto } from '../shared/models/authResponseDto';
import { AuthService } from '../shared/auth-service/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-customer',
  imports: [FormsModule],
  templateUrl: './register-customer.html',
  styleUrl: './register-customer.css',
})
export class RegisterCustomer {

  constructor(
    private http:HttpClient, 
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ){}
  customer: registerRequestDto = {
    FirstName: '',
    LastName: '',
    Phone: '',
    Gender: 0,
    DateOfBirth: ''
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     this.customer.Phone = params['phone']
    })
  }
  isSubmitting = false;
  
  registerCustomer(){
    this.isSubmitting = true;
    this.http.post<authResponseDto>(`${environment.apiUrls.customer}/Customer/auth/register-customer`,this.customer).subscribe({
      next: (res) =>{
        if(res.isSuccess){
          this.authService.setToken(res.token);
          this.router.navigate(['location'],{queryParams:{userId:res.userId}});
        }
      },
      error: (err) => {
        if(err.status == 400){
          this.snackBar.open("Invalid Login Credentials", 'Close',{duration:3000});
        }
        if(err.status == 500){
          this.snackBar.open("Internal Server Error", 'Close',{duration:3000 });
        }
      },
    });
  }
}
