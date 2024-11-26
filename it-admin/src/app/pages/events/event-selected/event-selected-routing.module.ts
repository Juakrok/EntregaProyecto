import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventSelectedPage } from './event-selected.page';

const routes: Routes = [
  {
    path: '',
    component: EventSelectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSelectedPageRoutingModule {}
