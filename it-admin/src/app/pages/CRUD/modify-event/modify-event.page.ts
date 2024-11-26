import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.page.html',
  styleUrls: ['./modify-event.page.scss'],
})
export class ModifyEventPage implements OnInit {
  event = {
    imagen: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    lugar: '',
  };

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['eventoo']) {
        this.event = JSON.parse(params['eventoo']); 
        console.log('Evento recibido:', this.event); 
      }
    });
  }


  goBack() {
    this.navCtrl.back();
  }

  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.event.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  modifyEvent() {
    console.log('Evento modificado:', this.event);
    alert('Cambios guardados correctamente');
  }
}
