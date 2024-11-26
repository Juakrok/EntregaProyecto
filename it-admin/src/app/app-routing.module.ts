import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/Usuario/user/user.module').then( m => m.UserPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'create-event',
    loadChildren: () => import('./pages/CRUD/create-event/create-event.module').then( m => m.CreateEventPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path: 'modify-event/:id',
    loadChildren: () => import('./pages/CRUD/modify-event/modify-event.module').then( m => m.ModifyEventPageModule),
    canActivate : [AutorizadoGuard]
  },
  {
    path:'editar',
    loadChildren: () => import('./pages/Usuario/editar/editar.module').then( m => m.EditarPageModule),
    canActivate : [AutorizadoGuard]
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
