import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MytasksPage } from './mytasks.page';

const routes: Routes = [
  {
    path: '',
    component: MytasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MytasksPageRoutingModule {}
