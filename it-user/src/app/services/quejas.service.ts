import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuejasService {

  private url = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getQuejas():Observable<any>{
    return this.http.get<any>(this.url+'/Comentarios');
  }

  postQueja(queja:any):Observable<any>{
    return this.http.post<any>(this.url+'/Comentarios',queja);
  }
}
