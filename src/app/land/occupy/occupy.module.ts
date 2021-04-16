import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OccupyPageRoutingModule } from './occupy-routing.module';

import { OccupyPage } from './occupy.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    OccupyPageRoutingModule
  ],
  declarations: [OccupyPage]
})
export class OccupyPageModule {}
