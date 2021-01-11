import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlipayPageRoutingModule } from './alipay-routing.module';

import { AlipayPage } from './alipay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlipayPageRoutingModule
  ],
  declarations: [AlipayPage]
})
export class AlipayPageModule {}
