import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  userdata: any;

  usuario = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
    rut: "",
    isActive: false
  };

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Cambiado a 6 para el mensaje
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByCorreo(email).subscribe(resp => {
      this.userdata = resp;
      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.EmailNoExiste();
        return;
      }

      this.usuario = {
        id: this.userdata[0].id,
        nombre: this.userdata[0].nombre,
        email: this.userdata[0].email,
        password: this.userdata[0].password,
        rut: this.userdata[0].rut,
        isActive: this.userdata[0].isActive,
      };

      if (this.usuario.password !== password) {
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }

      if (!this.usuario.isActive) {
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }

      this.iniciarSesion(this.usuario);
    });
  }

  private iniciarSesion(usuario: any) {
    sessionStorage.setItem('nombre',this.usuario.nombre);
    sessionStorage.setItem('email', this.usuario.email);
    sessionStorage.setItem('password', this.usuario.password);
    sessionStorage.setItem('rut', this.usuario.rut);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión iniciada: ' + this.usuario.email);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async UsuarioInactivo() {
    const alert = await this.alertCtrl.create({
      header: 'Usuario inactivo',
      message: 'El usuario se encuentra inactivo',
      buttons: ['OK'],
    });
    alert.present();
  }

  async ErrorUsuario() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      buttons: ['OK'],
    });
    alert.present();
  }

  async EmailNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Debe registrarse',
      buttons: ['OK'],
    });
    alert.present();
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}
