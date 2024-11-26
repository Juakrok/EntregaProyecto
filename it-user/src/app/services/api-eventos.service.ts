import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiEventosService {
  private url = environment.apiUrl;


  constructor(private httpclient:HttpClient) { }

  getEvents():Observable<any>{
    return this.httpclient.get<any>(this.url+'/events');
  }



  
}
