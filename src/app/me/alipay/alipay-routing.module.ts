import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlipayPage } from './alipay.page';

const routes: Routes = [
  {
    path: '',
    component: AlipayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlipayPageRoutingModule {}
