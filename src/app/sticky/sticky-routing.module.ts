import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StickyPage } from './sticky.page';

const routes: Routes = [
  {
    path: '',
    component: StickyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickyPageRoutingModule {}
