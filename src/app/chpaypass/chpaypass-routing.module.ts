import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChpaypassPage } from './chpaypass.page';

const routes: Routes = [
  {
    path: '',
    component: ChpaypassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChpaypassPageRoutingModule {}
