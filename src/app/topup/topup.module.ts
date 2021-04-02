import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupPageRoutingModule } from './topup-routing.module';

import { TopupPage } from './topup.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TopupPageRoutingModule
  ],
  declarations: [TopupPage]
})
export class TopupPageModule {}
