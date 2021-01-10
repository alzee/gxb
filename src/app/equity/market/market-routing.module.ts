import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketPage } from './market.page';

const routes: Routes = [
  {
    path: '',
    component: MarketPage
  },
  {
    path: 'rule',
    loadChildren: () => import('./rule/rule.module').then( m => m.RulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketPageRoutingModule {}
