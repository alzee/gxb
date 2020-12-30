import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CellPage } from './cell.page';

const routes: Routes = [
  {
    path: '',
    component: CellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CellPageRoutingModule {}
