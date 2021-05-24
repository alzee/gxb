import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChpasswdPageRoutingModule } from './chpasswd-routing.module';

import { ChpasswdPage } from './chpasswd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChpasswdPageRoutingModule
  ],
  declarations: [ChpasswdPage]
})
export class ChpasswdPageModule {}
