import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/auth/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./pages/user/editar/editar.module').then(m => m.EditarModule),
    canActivate:[AutorizadoGuard]
  },
  
  {
    path: 'perfil',
    loadChildren: () => import('./pages/user/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'detalle',
    loadChildren: () => import('./pages/eventos/detalle/detalle.module').then( m => m.DetallePageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'dejar-opinion',
    loadChildren: () => import('./pages/comentarios/dejar-opinion/dejar-opinion.module').then( m => m.DejarOpinionPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'comentar-evento',
    loadChildren: () => import('./pages/comentarios/comentar-evento/comentar-evento.module').then( m => m.ComentarEventoPageModule),
    canActivate:[AutorizadoGuard]
  }

  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
