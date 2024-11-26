import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveQrDataService } from 'src/app/services/save-qr-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  // Declarar
  evento: any;
  qrdata: string = '';
  nombre: string | null;
  rut: string | null;

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private saveQrDataService: SaveQrDataService,
    private al: AlertController
  ) {
    // Inicializar
    this.activated.queryParams.subscribe(params => {
      this.evento = JSON.parse(params['event']);
    });

    this.nombre = sessionStorage.getItem('nombre');
    this.rut = sessionStorage.getItem('rut');
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/tabs/tab2']);
    this.qrdata = '';
  }

  // Función para generar el QR
  async generarQr() {
    const qrInfo = {
      nombre: this.evento.nombre,
      fecha: this.evento.fecha,
      lugar: this.evento.lugar,
      usuarioNombre: this.nombre,
      usuarioRut: this.rut,
    };

    // Verificar si el QR ya existe para este usuario y evento
    const qrExiste = await this.checkIfQrExists(qrInfo);
    
    if (qrExiste) {
      // Si el QR ya existe, mostrar una alerta
      const alert = await this.al.create({
        header: 'Ya estás registrado',
        message: 'Ya estás registrado en este evento.',
        buttons: [{ text: 'Aceptar' }]
      });
      await alert.present();
    } else {
      // Si no existe, generar el QR
      this.qrdata = `${this.evento.nombre}  - ${this.evento.fecha} - ${this.evento.lugar} - ${this.nombre} - ${this.rut}`;
      console.log(this.qrdata);

      // Luego guardar el QR
      this.saveData(qrInfo);
    }
  }

  // Función para comprobar si el QR ya existe
  checkIfQrExists(qrInfo: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.saveQrDataService.checkQrExistence(qrInfo).subscribe(
        (exists) => {
          resolve(exists); // Si existe, resolver con 'true'
        },
        (error) => {
          reject(error); // Si hay un error, rechazar la promesa
        }
      );
    });
  }

  // Función para guardar el QR en el servidor
  saveData(qrInfo: any) {
    this.saveQrDataService.saveQrData(qrInfo).subscribe(
      response => {
        console.log('Datos del QR guardados correctamente', response);
      },
      error => {
        console.log('Error al guardar los datos del QR', error);
      }
    );
  }
}
