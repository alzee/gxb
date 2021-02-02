import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliesPageRoutingModule } from './applies-routing.module';

import { AppliesPage } from './applies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliesPageRoutingModule
  ],
  declarations: [AppliesPage]
})
export class AppliesPageModule {}
