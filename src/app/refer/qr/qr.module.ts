import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule
  ],
  providers: [
    FileTransfer,
    File
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
