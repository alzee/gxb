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
  },
  {
    path: 'market',
    loadChildren: () => import('./market/market.module').then( m => m.MarketPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then( m => m.MeetingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquityPageRoutingModule {}
