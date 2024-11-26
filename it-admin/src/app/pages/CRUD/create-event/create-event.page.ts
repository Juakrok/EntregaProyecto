import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { eventNew,events } from 'src/interfaces/events';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  
  events: events[]=[];

  selectedFile: File | null = null;
  event: events = {
    id:0,
    nombre: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    imagen: "",
    isActive:false  // Aquí guardamos solo el nombre de la imagen
  };

  eventdata:any;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private http: HttpClient,
    private alertcontroller:AlertController
  ) {
    
  }

  ngOnInit() {
    this.loadEvents();
  }

  // Función para manejar la selección de imagen
  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        this.event.imagen = reader.result as string;
        sessionStorage.setItem('imagen', this.event.imagen);
      };
  
      reader.readAsDataURL(this.selectedFile);
    }
  }


  loadEvents(){
    this.eventsService.getEvents().subscribe(data=>{
      this.events=data;
    })
  }

  // Crear evento
  createEvent() {
    this.eventsService.createEvent(this.event).subscribe();
    this.mostrarMensaje();
    this.loadEvents();
  }

  async mostrarMensaje(){
    const alert = await this.alertcontroller.create({
      mode: 'ios',
      header: 'Evento creado correctamente',
      message: 'Evento creado '+this.event.nombre,
      buttons:[{
        text:'OK',
        handler:()=>{
          this.router.navigateByUrl('/tabs/tab3');
        }
      }]
    });

    alert.present();
  }

  async errorDuplicado(){
    const alert = await this.alertcontroller.create({
      header:'Error...',
      message:'El evento ya existe',
      buttons:[{
        text:'OK',
        handler:()=>{
          this.router.navigateByUrl('/tabs/tab3');
        }
      }]
    });
    await alert.present();
  }

  // Función para regresar a la página de eventos
  goBack() {
    this.router.navigate(['/tabs/tab3']);
  }
}
