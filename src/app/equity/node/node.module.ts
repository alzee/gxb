import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodePageRoutingModule } from './node-routing.module';

import { NodePage } from './node.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NodePageRoutingModule
  ],
  declarations: [NodePage]
})
export class NodePageModule {}
