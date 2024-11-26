import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DejarOpinionPage } from './dejar-opinion.page';

const routes: Routes = [
  {
    path: '',
    component: DejarOpinionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DejarOpinionPageRoutingModule {}
