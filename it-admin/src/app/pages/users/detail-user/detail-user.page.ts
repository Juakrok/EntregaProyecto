import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {
  rut: string | null = null;
  usuario: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authservice: AuthService,
    private alertcontroller: AlertController
  ) { }

  ngOnInit() {
    // Recuperar el 'rut' de la URL
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    
    if (this.rut) {
      this.getUserDetails(this.rut); // Obtener los detalles del usuario
    }
  }

  getUserDetails(rut: string) {
    // Llamar al servicio para obtener los detalles del usuario por su rut
    this.authservice.getUsuarioPorRut(rut).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        this.presentAlert('Error', 'No se pudo cargar el detalle del usuario.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
