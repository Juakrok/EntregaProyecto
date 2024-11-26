import { Component } from '@angular/core';

interface Options{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  options: Options[] = [
  {
    icon: 'person-circle-outline',
    name: 'Perfil',
    redirectTo: '/user'
  },
  {
    icon: 'people-outline',
    name: 'Usuarios',
    redirectTo: '/users'
  },
  {
    icon: 'log-out-outline',
    name: 'Cerrar Sesión',
    redirectTo: '/login'
  }
  ];
}
