import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentarEventoPageRoutingModule } from './comentar-evento-routing.module';

import { ComentarEventoPage } from './comentar-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarEventoPageRoutingModule
  ],
  declarations: [ComentarEventoPage]
})
export class ComentarEventoPageModule {}
