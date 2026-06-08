import { Routes } from '@angular/router';
import { OtpLogin } from './shared/otp-login/otp-login';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: OtpLogin,
    data: { role: 'customer' }
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) 
  }
];
