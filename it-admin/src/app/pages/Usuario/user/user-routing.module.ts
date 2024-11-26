import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPage } from './user.page'; // Importa correctamente la clase UserPage

const routes: Routes = [
  {
    path: '',
    component: UserPage, // Usa la clase exportada de user.page.ts
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}

