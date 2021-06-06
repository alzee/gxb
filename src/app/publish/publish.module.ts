import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishPageRoutingModule } from './publish-routing.module';

import { PublishPage } from './publish.page';

import { DebounceClickModule } from '../debounce-click.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PublishPageRoutingModule,
    DebounceClickModule
  ],
  declarations: [PublishPage]
})
export class PublishPageModule {}
