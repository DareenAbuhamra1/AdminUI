import { Routes } from '@angular/router';
import { OtpLogin } from './shared/otp-login/otp-login';
import { RoleSelection } from './role-selection/role-selection';
import { RequestOtp } from './shared/request-otp/request-otp';
import { VerifyOtp } from './verify-otp/verify-otp';

export const routes: Routes = [
  { 
    path: '', 
    component: RoleSelection 
  },
  { 
    path: 'request-otp', 
    component: RequestOtp,
    //data: { role: 'customer' }
  },
  { 
    path: 'verify-otp', 
    component: VerifyOtp,
    //data: { role: 'customer' }
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) 
  }
];
