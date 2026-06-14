import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { FormsModule } from '@angular/forms';
import { Orders } from "./orders/orders";

@NgModule({
  declarations: [Login, Dashboard],
  imports: [
    CommonModule,
    FormsModule, // for the form in Login component
    RouterModule.forChild([
        { path: 'login', component: Login },
        { path: 'dashboard', component: Dashboard },
    ]),
    Orders
],
})
export class AdminModule {}
