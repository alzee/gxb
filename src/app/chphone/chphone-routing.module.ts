import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChphonePage } from './chphone.page';

const routes: Routes = [
  {
    path: '',
    component: ChphonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChphonePageRoutingModule {}
