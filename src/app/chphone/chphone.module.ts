import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChphonePageRoutingModule } from './chphone-routing.module';

import { ChphonePage } from './chphone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChphonePageRoutingModule
  ],
  declarations: [ChphonePage]
})
export class ChphonePageModule {}
