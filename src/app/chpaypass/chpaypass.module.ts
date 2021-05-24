import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChpaypassPageRoutingModule } from './chpaypass-routing.module';

import { ChpaypassPage } from './chpaypass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChpaypassPageRoutingModule
  ],
  declarations: [ChpaypassPage]
})
export class ChpaypassPageModule {}
