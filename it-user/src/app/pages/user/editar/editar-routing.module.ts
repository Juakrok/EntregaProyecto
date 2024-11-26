import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPage } from './editar.page'; // Nombre correcto del componente

const routes: Routes = [
  {
    path: '',
    component: EditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarPageRoutingModule { }
