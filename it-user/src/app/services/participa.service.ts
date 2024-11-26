import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';
import { Participacion, ParticipacionNueva } from 'src/interfaces/participacion';
import { Observable, BehaviorSubject } from 'rxjs';
import { ComentarEvento } from 'src/interfaces/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {
  private url = environment.apiUrl;
  private comentariosSubject = new BehaviorSubject<ComentarEvento[]>([]);
  comentarios$ = this.comentariosSubject.asObservable();

  constructor(private http: HttpClient) { }

  GetUserByCorreo(email: any): Observable<Users> {
    return this.http.get<Users>(`${this.url}/usuarios/?email=${email}`);
  }

  postParticipacion(nuevaParticipacion: ParticipacionNueva): Observable<ParticipacionNueva> {
    return this.http.post<ParticipacionNueva>(`${this.url}/participaciones`, nuevaParticipacion);
  }

  getParticipaciones(): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${this.url}/Participacion`);
  }

  deleteParticipacion(id: number): Observable<any> {
    return this.http.delete<Participacion>(`${this.url}/Participacion/${id}`);
  }

  getParticipacionByRut(rut: string): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${this.url}/Participacion/?usuarioRut=${rut}`);
  }
  

  guardarComentario(comentarioData: ComentarEvento): Observable<ComentarEvento> {
    return this.http.post<ComentarEvento>(`${this.url}/ComentarEvento`, comentarioData);
  }

  getComentariosByEventoId(eventoId: number): Observable<ComentarEvento[]> {
    return this.http.get<ComentarEvento[]>(`${this.url}/ComentarEvento?eventoId=${eventoId}`);
  }

  updateComentarios(eventoId: number) {
    this.getComentariosByEventoId(eventoId).subscribe(comentarios => {
      this.comentariosSubject.next(comentarios);
    });
  }
}
