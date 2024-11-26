import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventSelectedPageRoutingModule } from './event-selected-routing.module';

import { EventSelectedPage } from './event-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventSelectedPageRoutingModule
  ],
  declarations: [EventSelectedPage]
})
export class EventSelectedPageModule {}
