import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectPage } from './collect.page';

const routes: Routes = [
  {
    path: '',
    component: CollectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectPageRoutingModule {}
