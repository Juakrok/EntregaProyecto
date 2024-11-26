import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPage } from './users.page';
import { AutorizadoGuard } from 'src/app/guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'detail-user',
    loadChildren: () => import('./detail-user/detail-user.module').then( m => m.DetailUserPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'detail-user/:rut',
    loadChildren: () => import('./detail-user/detail-user.module').then( m => m.DetailUserPageModule),
    canActivate : [AutorizadoGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
