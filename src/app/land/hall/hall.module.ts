import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HallPageRoutingModule } from './hall-routing.module';

import { HallPage } from './hall.page';
import { DateAgoPipe } from '../../date-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HallPageRoutingModule
  ],
  declarations: [HallPage, DateAgoPipe]
})
export class HallPageModule {}
