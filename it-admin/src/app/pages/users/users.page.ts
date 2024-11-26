import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController ,ToastController, AlertController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  usuarios:any[]=[];

  constructor(
    private router:Router ,
    private loadingcontroller:LoadingController,
    private toastcontroller:ToastController,
    private alertcontroller:AlertController,
    private authservice:AuthService
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }
  
  getUsuarios(){
    this.authservice.getUsuarios().subscribe((data)=>{
      this.usuarios= data;
    })
  }

  openUser(rut: string) {
    // Navegar a la página de detalles del usuario pasando el rut como parámetro
    this.router.navigate(['/user-detail', rut]);
  }


  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
