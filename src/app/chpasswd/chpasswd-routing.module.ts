import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChpasswdPage } from './chpasswd.page';

const routes: Routes = [
  {
    path: '',
    component: ChpasswdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChpasswdPageRoutingModule {}
