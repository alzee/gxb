import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepricePage } from './changeprice.page';

const routes: Routes = [
  {
    path: '',
    component: ChangepricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangepricePageRoutingModule {}
