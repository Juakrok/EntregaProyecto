// save-qr-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { environment } from 'src/environments/environment';  // Asegúrate de tener configurado tu endpoint en environment

@Injectable({
  providedIn: 'root'
})
export class SaveQrDataService {

  constructor(private http: HttpClient) { }

  // Método para guardar datos del QR
  saveQrData(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Participacion`, data);
  }

  // Método para comprobar si el QR ya existe
  checkQrExistence(qrInfo: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/Participacion`, { params: qrInfo }).pipe(
      map(participaciones => participaciones.length > 0)
    );
  }

  // Método para obtener todos los datos de los QR generados
  getQrData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Participacion`);
  }
}
