import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangepricePageRoutingModule } from './changeprice-routing.module';

import { ChangepricePage } from './changeprice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangepricePageRoutingModule
  ],
  declarations: [ChangepricePage]
})
export class ChangepricePageModule {}
