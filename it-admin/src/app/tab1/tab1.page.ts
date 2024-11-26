import { Component,OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  intervalId:any;
  eventos:any = [];

  constructor(private menucontroller:MenuController ,
              private router:Router,
              private eventservice:EventsService) {}

  ngOnInit(){
    
    this.Eventos();
    this.startAutoRefresh();
  }
  mostrarMenu(){
    this.menucontroller.open('first');
  }

  Eventos(){
    this.eventservice.getEvents().subscribe(datos=> 
      this.eventos = datos,
    )
  }


  startAutoRefresh(){
    this.intervalId = setInterval(()=>{
      this.Eventos();
    },5000);
  }

  buscarEvento(Observable:any){
    this.router.navigate(['/detalle'],
      {queryParams:{event:JSON.stringify(Observable)}})
  }

  getImagePath(imagen: string): string {
    return `assets/Imagenes/${imagen}`; // Asumiendo que tus imágenes están en assets/Imagenes/
  }

  eventoSeleccionado(){
    this.router.navigate(['/events/event-selected']);
  }


}
