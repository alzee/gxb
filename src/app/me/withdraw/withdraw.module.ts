import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawPageRoutingModule } from './withdraw-routing.module';

import { WithdrawPage } from './withdraw.page';

import { DebounceClickModule } from '../../debounce-click.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WithdrawPageRoutingModule,
    DebounceClickModule
  ],
  declarations: [WithdrawPage]
})
export class WithdrawPageModule {}
