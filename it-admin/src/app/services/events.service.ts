import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable,of } from 'rxjs';
import { eventNew,events } from 'src/interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = environment.apiUrl;


  constructor(private httpclient:HttpClient) { }
    getEvents():Observable<events[]>{
      return this.httpclient.get<events[]>(`${environment.apiUrl}/events`);
    }

    getEventById(id:number):Observable<events>{
      return this.httpclient.get<events>(`${environment.apiUrl}/events/?id=${id}`);
    }

    createEvent(nuevoEvento:eventNew):Observable<eventNew>{
      return this.httpclient.post<eventNew>(`${environment.apiUrl}/events`,nuevoEvento);
    }

    updateEvent(evento:any):Observable<events>{
      return this.httpclient.put<events>(`${environment.apiUrl}/events/${evento.id}`,evento);
    }

    deleteEvent(evento: any): Observable<events> {
      return this.httpclient.delete<events>(`${environment.apiUrl}/events/${evento.id}`);
    }
      

    getEventByNameorBydateAndLocation(name:string,date:string,location:string):Observable<events>{
      return this.httpclient.get<events>(`${environment.apiUrl}/events/?name=${name}&?date=${date}&?location=${location}`);
    }


    verificarInscricion(usuarioId:string,eventoId:string):Observable<boolean>{
      const url = `${environment.apiUrl}/Participacion?usuarioId=${usuarioId}&eventoId=${eventoId}`;
      return this.httpclient.get<any[]>(url).pipe(
        map(inscripciones=>{
          console.log('Inscripciones encontradas:',inscripciones);
          return inscripciones.length>0;
        }),
        catchError(error=>{
          console.error('Error al verificar inscripcion',error);
          return of(false);
        })
      )
    }

}
