import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquityPageRoutingModule } from './equity-routing.module';

import { EquityPage } from './equity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquityPageRoutingModule
  ],
  declarations: [EquityPage]
})
export class EquityPageModule {}
