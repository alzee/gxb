import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferPage } from './refer.page';

const routes: Routes = [
  {
    path: '',
    component: ReferPage
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferPageRoutingModule {}
