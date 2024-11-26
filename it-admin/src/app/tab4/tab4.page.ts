import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ParticipacionesService } from '../services/participaciones.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  participaciones:any[]=[];
  
  

  constructor(
    private menucontroller: MenuController,
    private router: Router,
    private participacionService:ParticipacionesService) { }


  ngOnInit(){
    this.Asistentes();
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  

  navegar(){
    this.router.navigate(['/events/detail-event']);
  }

  Asistentes(){
    this.participacionService.getParticipaciones().subscribe(datos =>{
      this.participaciones = datos;
      console.log(this.participaciones);
    })
  }

}