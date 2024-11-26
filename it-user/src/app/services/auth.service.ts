import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Users | null = null;


  constructor(private httpclient: HttpClient) { }

  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }
  
  GetUserByCorreo(email: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios/?email=${email}`);
  }
  
  

  IsLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }

  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  GetUsuarioId(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`HTTP Error: ${error.message}`);
    return throwError('Ocurrió un error al comunicarse con el servidor.');
  }


  putUsuario(usuario: any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }
  
}
