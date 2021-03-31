import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { MePage } from './me.page';

const routes: Routes = [
  {
    path: '',
    component: MePage
  },
  {
    path: 'finance',
    canActivate: [AuthGuard],
    loadChildren: () => import('./finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'setting',
    canActivate: [AuthGuard],
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'alipay',
    canActivate: [AuthGuard],
    loadChildren: () => import('./alipay/alipay.module').then( m => m.AlipayPageModule)
  },
  {
    path: 'withdraw',
    canActivate: [AuthGuard],
    loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'coupon',
    canActivate: [AuthGuard],
    loadChildren: () => import('./coupon/coupon.module').then( m => m.CouponPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
