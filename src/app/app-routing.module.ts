import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'hall',
    loadChildren: () => import('./hall/hall.module').then( m => m.HallPageModule)
  },
  {
    path: 'equity',
    loadChildren: () => import('./equity/equity.module').then( m => m.EquityPageModule)
  },
  {
    path: 'land',
    loadChildren: () => import('./land/land.module').then( m => m.LandPageModule)
  },
  {
    path: 'me',
    loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
  },
  {
    path: 'mytasks',
    canActivate: [AuthGuard],
    loadChildren: () => import('./mytasks/mytasks.module').then( m => m.MytasksPageModule)
  },
  {
    path: 'publish',
    canActivate: [AuthGuard],
    loadChildren: () => import('./publish/publish.module').then( m => m.PublishPageModule)
  },
  {
    path: 'myposts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./myposts/myposts.module').then( m => m.MypostsPageModule)
  },
  {
    path: 'bonus',
    canActivate: [AuthGuard],
    loadChildren: () => import('./bonus/bonus.module').then( m => m.BonusPageModule)
  },
  {
    path: 'approve',
    canActivate: [AuthGuard],
    loadChildren: () => import('./approve/approve.module').then( m => m.ApprovePageModule)
  },
  {
    path: 'sticky',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sticky/sticky.module').then( m => m.StickyPageModule)
  },
  {
    path: 'promo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./promo/promo.module').then( m => m.PromoPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'bids',
    canActivate: [AuthGuard],
    loadChildren: () => import('./bids/bids.module').then( m => m.BidsPageModule)
  },
  {
    path: 'topup',
    canActivate: [AuthGuard],
    loadChildren: () => import('./topup/topup.module').then( m => m.TopupPageModule)
  },
  {
    path: 'pay',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'vip',
    canActivate: [AuthGuard],
    loadChildren: () => import('./vip/vip.module').then( m => m.VipPageModule)
  },
  {
    path: 'refer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./refer/refer.module').then( m => m.ReferPageModule)
  },
  {
    path: 'applies',
    canActivate: [AuthGuard],
    loadChildren: () => import('./applies/applies.module').then( m => m.AppliesPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'chpasswd',
    loadChildren: () => import('./chpasswd/chpasswd.module').then( m => m.ChpasswdPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
