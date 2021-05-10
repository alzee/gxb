import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { EquityPage } from './equity.page';

const routes: Routes = [
  {
    path: '',
    component: EquityPage
  },
  {
    path: 'collect',
    canActivate: [AuthGuard],
    loadChildren: () => import('./collect/collect.module').then( m => m.CollectPageModule)
  },
  {
    path: 'exchange',
    canActivate: [AuthGuard],
    loadChildren: () => import('./exchange/exchange.module').then( m => m.ExchangePageModule)
  },
  {
    path: 'market',
    canActivate: [AuthGuard],
    loadChildren: () => import('./market/market.module').then( m => m.MarketPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then( m => m.MeetingPageModule)
  },
  {
    path: 'topic',
    loadChildren: () => import('./topic/topic.module').then( m => m.TopicPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'node',
    loadChildren: () => import('./node/node.module').then( m => m.NodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquityPageRoutingModule {}
