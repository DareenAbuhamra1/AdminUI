import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { FormsModule } from '@angular/forms';
import { Orders } from "./orders/orders";
import { AdminMenu } from './menu/admin-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Domain } from './domain/domain';
import { Partner } from './partner/partner';
import { Driver } from './driver/driver';

@NgModule({
  declarations: [Login, Dashboard,AdminMenu],
  imports: [
    CommonModule,
    FormsModule, // for the form in Login component
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild([
        { path: 'login', component: Login },
        { path: 'dashboard', component: Dashboard },
        { path:'domain',component:Domain},
        { path: 'partners', component: Partner},
        { path: 'drivers', component: Driver }
    ]),
    Orders,
  ],
  exports:[
    AdminMenu
  ]
})
export class AdminModule {}
