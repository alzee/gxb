import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquityPage } from './equity.page';

const routes: Routes = [
  {
    path: '',
    component: EquityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquityPageRoutingModule {}
