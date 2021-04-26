import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChpasswdPageRoutingModule } from './chpasswd-routing.module';

import { ChpasswdPage } from './chpasswd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChpasswdPageRoutingModule
  ],
  declarations: [ChpasswdPage]
})
export class ChpasswdPageModule {}
