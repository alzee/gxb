import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectPageRoutingModule } from './collect-routing.module';

import { CollectPage } from './collect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectPageRoutingModule
  ],
  declarations: [CollectPage]
})
export class CollectPageModule {}
