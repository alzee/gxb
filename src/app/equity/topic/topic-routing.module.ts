import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicPage } from './topic.page';

const routes: Routes = [
  {
    path: '',
    component: TopicPage
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicPageRoutingModule {}
