import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquityPage } from './equity.page';

const routes: Routes = [
  {
    path: '',
    component: EquityPage
  },
  {
    path: 'collect',
    loadChildren: () => import('./collect/collect.module').then( m => m.CollectPageModule)
  },
  {
    path: 'exchange',
    loadChildren: () => import('./exchange/exchange.module').then( m => m.ExchangePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquityPageRoutingModule {}
