import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-selected',
  templateUrl: './event-selected.page.html',
  styleUrls: ['./event-selected.page.scss'],
})
export class EventSelectedPage {

  fechaSeleccionada: string | null = null;
  mostrarCalendario: boolean = false;

  constructor(private alertcontroller: AlertController) { }

  abrirCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  cerrarCalendario() {
    this.mostrarCalendario = false;
  }

  async agendarEvento() {
    const alert = await this.alertcontroller.create({
      header: 'Evento Agendado',
      message: 'Tu evento ha sido agendado para el día ' + this.fechaSeleccionada + ' te enviamos un correo con la confirmación',
      buttons: ['OK']
    });

    await alert.present();
  }

}