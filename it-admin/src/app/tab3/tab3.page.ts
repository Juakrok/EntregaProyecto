import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { events } from 'src/interfaces/events';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  events: events[] = [];
  evento: events | undefined;
  puedeComentar: boolean = false; 
  intervalId:any;

  constructor(
    private menucontroller: MenuController,
    private router: Router,
    private alertcontroller: AlertController,
    private event: EventsService,
    private activated: ActivatedRoute,
    private auth: AuthService
  ) {
    this.activated.queryParams.subscribe(param => {
      if (param['eventoo']) {
        this.evento = JSON.parse(param['eventoo']);
      }
    });
  }

  ngOnInit() {
    this.loadEvents();
    if (this.evento && this.evento.id) {
      this.verificarAsistencia(this.evento.id.toString());
    }
  }

  verificarAsistencia(eventoId: string) {
    const usuarioId = this.auth.getUserById();
    if (usuarioId && eventoId) {
      this.event.verificarInscricion(usuarioId, eventoId).subscribe(inscrito => {
        this.puedeComentar = inscrito;  
      });
    }
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  loadEvents() {
    this.event.getEvents().subscribe(datos => {
      this.events = datos;
    });
  }

  async createEvent() {
    await this.router.navigate(['/create-event']);
    this.loadEvents();
  }

  buscarEvento(event: events) {
    this.router.navigate(['/modify-event/:id'], {
      queryParams: { eventoo: JSON.stringify(event) }
    });
  }

  async deleteEvent(event: events) {
    const alert = await this.alertcontroller.create({
      header: 'Eliminar evento',
      message: `¿Estás seguro de que quieres eliminar el evento "${event.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.event.deleteEvent(event).subscribe(() => {
              this.mensaje();
              this.loadEvents();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Eliminando evento',
      message: 'El evento ha sido eliminado',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab3']);
          },
        },
      ],
    });

    await alert.present();
  }
}
