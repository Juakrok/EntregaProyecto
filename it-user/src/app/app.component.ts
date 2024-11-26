import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle';
register(); 
interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  menu:Menu[]=[
    {
      icon:'sparkles-outline',
      name: 'Iniciar Sesión',
      redirecTo: '/inicio'
    },
    {
      icon:'flower-outline',
      name: 'Home',
      redirecTo: '/tabs/tab1'
    }, 
    {
      icon:'bug-outline',
      name: 'Eventos',
      redirecTo: '/tabs/tab2'
    },   
    {
      icon:'person-circle-outline',
      name: 'Mi Perfil',
      redirecTo: '/tabs/tab3'
    },
  ]

  constructor() {
  }

  
}
