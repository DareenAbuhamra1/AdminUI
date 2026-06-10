import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forChild([
      {path:'domains',},
      {path:'stores'},
      {path:'store'},
    ]),
  ],
})
export class CustomerModule {}
