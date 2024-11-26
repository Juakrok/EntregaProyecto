import { Component } from '@angular/core';
import { AutorizadoGuard } from '../guards/autorizado.guard';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private autorizado:AutorizadoGuard,
    private router:Router,)  {}

  logout(){
    sessionStorage.removeItem('rut');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('ingresado');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('fotoPerfil');


    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/inicio'], { queryParams: { refresh: Date.now() } });

  }

}
