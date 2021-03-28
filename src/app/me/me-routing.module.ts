import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MePage } from './me.page';

const routes: Routes = [
  {
    path: '',
    component: MePage
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'alipay',
    loadChildren: () => import('./alipay/alipay.module').then( m => m.AlipayPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'coupon',
    loadChildren: () => import('./coupon/coupon.module').then( m => m.CouponPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
