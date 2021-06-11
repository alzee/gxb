import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketPage } from './market.page';

const routes: Routes = [
  {
    path: '',
    component: MarketPage
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then( m => m.MyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketPageRoutingModule {}
