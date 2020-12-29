import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytasksPageRoutingModule } from './mytasks-routing.module';

import { MytasksPage } from './mytasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytasksPageRoutingModule
  ],
  declarations: [MytasksPage]
})
export class MytasksPageModule {}
