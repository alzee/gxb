import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OccupyPage } from './occupy.page';

const routes: Routes = [
  {
    path: '',
    component: OccupyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OccupyPageRoutingModule {}
