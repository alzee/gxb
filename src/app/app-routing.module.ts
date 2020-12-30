import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./mytasks/mytasks.module').then( m => m.MytasksPageModule)
  },
  {
    path: 'publish',
    loadChildren: () => import('./publish/publish.module').then( m => m.PublishPageModule)
  },
  {
    path: 'myposts',
    loadChildren: () => import('./myposts/myposts.module').then( m => m.MypostsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
