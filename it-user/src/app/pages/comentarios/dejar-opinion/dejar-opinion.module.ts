import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DejarOpinionPageRoutingModule } from './dejar-opinion-routing.module';

import { DejarOpinionPage } from './dejar-opinion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DejarOpinionPageRoutingModule
  ],
  declarations: [DejarOpinionPage]
})
export class DejarOpinionPageModule {}
