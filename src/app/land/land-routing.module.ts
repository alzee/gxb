import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandPage } from './land.page';

const routes: Routes = [
  {
    path: '',
    component: LandPage
  },
  {
    path: 'occupy',
    loadChildren: () => import('./occupy/occupy.module').then( m => m.OccupyPageModule)
  },
  {
    path: 'cell',
    loadChildren: () => import('./cell/cell.module').then( m => m.CellPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandPageRoutingModule {}
