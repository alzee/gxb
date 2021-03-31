import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { LandPage } from './land.page';

const routes: Routes = [
  {
    path: '',
    component: LandPage
  },
  {
    path: 'occupy',
    canActivate: [AuthGuard],
    loadChildren: () => import('./occupy/occupy.module').then( m => m.OccupyPageModule)
  },
  {
    path: 'cell',
    loadChildren: () => import('./cell/cell.module').then( m => m.CellPageModule)
  },
  {
    path: 'my',
    canActivate: [AuthGuard],
    loadChildren: () => import('./my/my.module').then( m => m.MyPageModule)
  },
  {
    path: 'hall',
    canActivate: [AuthGuard],
    loadChildren: () => import('./hall/hall.module').then( m => m.HallPageModule)
  },
  {
    path: 'pay',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'changeprice',
    canActivate: [AuthGuard],
    loadChildren: () => import('./changeprice/changeprice.module').then( m => m.ChangepricePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandPageRoutingModule {}
