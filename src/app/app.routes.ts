import { Routes } from '@angular/router';
import { RoleSelection } from './role-selection/role-selection';
import { RequestOtp } from './shared/request-otp/request-otp';
import { VerifyOtp } from './shared/verify-otp/verify-otp';
import { RegisterCustomer } from './register-customer/register-customer';
import { LocationCustomer } from './customer/location-customer/location-customer';

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
    path: 'register-customer',
    component: RegisterCustomer,
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) 
  },
  {
    path : 'customer',
    loadChildren: () => import('./customer/customer-module').then(m => m.CustomerModule)
  },
  {
    path : 'location',
    component : LocationCustomer 
  },
  {
    path : 'partner',
    loadChildren: () => import('./partner/partner-module').then(m => m.PartnerModule)
  },
  {
    path:'driver',
    loadChildren:()=> import('./driver/driver-module').then(m => m.DriverModule)
  }
];
