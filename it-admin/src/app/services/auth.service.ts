import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { adminNuevo, administradores, Users } from 'src/interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  // Obtener usuario por correo
  GetUserByCorreo(email: string): Observable<administradores[]> {
    return this.httpclient.get<administradores[]>(`${environment.apiUrl}/Administradores/?email=${email}`);
  }

  // Crear un nuevo usuario
  CreateUser(nuevoadmin: adminNuevo): Observable<adminNuevo> {
    return this.httpclient.post<adminNuevo>(`${environment.apiUrl}/Administradores`, nuevoadmin);
  }

  // Verificar si el usuario está logueado
  IsLoggenIn() {
    return sessionStorage.getItem('email') != null;
  }

  getUserById():string|null{
    return sessionStorage.getItem('id');
  }

  getUsuarios():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  getUsuarioPorRut(rut:string):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?rut=${rut}`);
  }
}
