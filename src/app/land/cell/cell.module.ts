import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CellPageRoutingModule } from './cell-routing.module';

import { CellPage } from './cell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CellPageRoutingModule
  ],
  declarations: [CellPage]
})
export class CellPageModule {}
