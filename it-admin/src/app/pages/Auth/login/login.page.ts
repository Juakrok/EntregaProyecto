import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController ,ToastController, AlertController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  userdata :any;
  usuario={
    id:0,
    nombre:"",
    email:"",
    password:"",
    rut:"",
    imagen:"",
    isActive:false
  };

  loginForm: FormGroup;

  constructor( 
    private router:Router ,
    private loadingcontroller:LoadingController,
    private menucontroller:MenuController,
    private authservice:AuthService,
    private formbuilder:FormBuilder,
    private alertcontroller:AlertController,
    private toastcontroller:ToastController
      ) { 
        this.loginForm =this.formbuilder.group({
          email: ['',[Validators.required, Validators.email ]],
          password: ['',[Validators.required, Validators.minLength(8)]],
        });
      }


    ngOnInit(){
      this.loginForm.reset();
    }
  async inicioSesion(){
    const loading = await this.loadingcontroller.create({
      mode: 'ios',
      message: 'Iniciando Sesión...',
      duration: 1500
    });
    await loading.present();
    this.login();

    
  }

  login(){
    if(!this.loginForm.valid){
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByCorreo(email).subscribe(resp => {
      this.userdata = resp;
      if(this.userdata.length ===0 ){
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
        imagen: this.userdata[0].imagen,
        isActive: this.userdata[0].isActive,
      };

      if(this.usuario.password !== password){
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }

      if(!this.usuario.isActive){
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }


      this.iniciarSesion(this.usuario);
    });
  }

  private iniciarSesion(usuario:any){
    sessionStorage.setItem('nombre',this.usuario.nombre);
    sessionStorage.setItem('email',this.usuario.email);
    sessionStorage.setItem('password', this.usuario.password);
    sessionStorage.setItem('rut', this.usuario.rut);
    sessionStorage.setItem('imagen', this.usuario.imagen);
    sessionStorage.setItem('isActive', 'true');
    this.showToast('Sesion iniciada: '+ this.usuario.nombre);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg : string){
    const toast = await this.toastcontroller.create({
      message:msg,
      duration:3000,
    });
    toast.present();
  }

  async UsuarioInactivo(){
    const alert = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'El usuario se encuentra inactivo',
      buttons: ['OK'],
    });

    alert.present();
  }

  async ErrorUsuario(){
    const alert = await this.alertcontroller.create({
      header: 'Error de usuario',
      message: 'Contraseña incorrecta',
      buttons: ['OK'],
    });
    alert.present();
  }

  async EmailNoExiste(){
    const alert = await this.alertcontroller.create({
      header: 'Email no encontrado',
      message: 'Debe registrarse',
      buttons: ['OK'],
    });
    alert.present();
  }

  
}
