import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Participacion,ParticipacionNueva } from 'src/interfaces/participaciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionesService {

  constructor(
    private http:HttpClient) { }

  getParticipaciones():Observable<Participacion[]>{
    return this.http.get<Participacion[]>(`${environment.apiUrl}/Participacion`);
  }


}
