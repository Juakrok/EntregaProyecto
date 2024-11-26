import { Component, OnInit, ViewChild  } from '@angular/core';
import { ApiEventosService } from '../services/api-eventos.service';
import { QuejasService } from '../services/quejas.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuejasNuevas } from 'src/interfaces/quejas';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  eventos :any[]=[]
  
  quejasForm:FormGroup;

  nuevaQueja : QuejasNuevas={
    queja:""
  }

  data:any;
  constructor(
    private apiuser: ApiEventosService,
    private quejasservice: QuejasService,
    private alertController: AlertController,
    private fbuilder: FormBuilder,
    private router: Router  
  ) {
    this.quejasForm = this.fbuilder.group({
      'queja': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }
  

  ngOnInit() {
    this.Eventos()
  }

  Postquejas(){
    if(this.quejasForm.valid){
      this.nuevaQueja.queja = this.quejasForm.value.queja;
      this.quejasservice.postQueja(this.nuevaQueja).subscribe();
      this.quejasForm.reset();
      this.mostrarMensaje();
      this.router.navigateByUrl(`/comentarios`);
    }else{
      this.errorMensaje();
      this.quejasForm.reset();
    }

  }

  

  swiperSlideChanged(e:any){
    console.log('Cambio de slide', e);
  }
  
  Eventos(){
    this.apiuser.getEvents().subscribe(datos=> 
      this.eventos = datos,
    )
  }
  

  async errorMensaje(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, rellene todos los campos',
      buttons: ['OK']
    })
    await alert.present();
  }
  async mostrarMensaje(){
    const alert = await this.alertController.create({
      header: 'Comentario enviado',
      message: 'Tu comentario ha sido enviado con exito',
      buttons: ['OK']
    });
    await alert.present();

  }
      
  
}
