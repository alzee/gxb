import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OccupyPageRoutingModule } from './occupy-routing.module';

import { OccupyPage } from './occupy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OccupyPageRoutingModule
  ],
  declarations: [OccupyPage]
})
export class OccupyPageModule {}
