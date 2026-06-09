import { Routes } from '@angular/router';
import { OtpLogin } from './shared/otp-login/otp-login';
import { RoleSelection } from './role-selection/role-selection';
import { RequestOtp } from './shared/request-otp/request-otp';

export const routes: Routes = [
  { 
    path: '', 
    component: RoleSelection 
  },
  { 
    path: 'login', 
    component: RequestOtp,
    //data: { role: 'customer' }
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) 
  }
];
