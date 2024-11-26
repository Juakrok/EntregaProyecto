import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from 'src/interfaces/users';
import { validarRut } from 'src/app/Validators/rut-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm:FormGroup;
  nuevoUsuario: UserNuevo={
    nombre:"",
    email:"",
    password:"",
    imagen:"",
    rut:"",
    isActive:false
  }

  userdata:any;

  constructor(
    private auth:AuthService,
    private alertcontroller:AlertController,
    private router:Router,
    private fbuilder:FormBuilder
  ) { 
    this.registroForm = this.fbuilder.group({
      'nombre': new FormControl("",[Validators.required, Validators.minLength(3)]),
      'email' : new FormControl("",[Validators.required, Validators.email]),
      'password':new FormControl("",[Validators.required,Validators.minLength(8)]),
      'rut': new FormControl("", [Validators.required, Validators.minLength(10)]),
    })
  }

  ngOnInit() {
  }

  crearUsuario(){
    if(this.registroForm.valid){
      this.auth.GetUserByCorreo(this.registroForm.value.email).subscribe(resp=>{
        this.userdata = resp;
        if(this.userdata.length>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.nombre = this.registroForm.value.nombre;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.rut = this.registroForm.value.rut;
          this.nuevoUsuario.isActive = true;
          this.auth.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/inicio');
        }
      })
    }
  }

  

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      mode:'ios',
      header: 'Usuario creado',
      message: 'Bienvenid@ '+ this.nuevoUsuario.nombre,
      buttons:['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header:'Error...',
      message: 'El correo ya existe',
      buttons:[{
        text: 'OK',
        handler:()=>{
          this.router.navigateByUrl('/inicio');
        }
      }]
    });
    await alerta.present();
  }

  inicio(){
    this.router.navigate(['/inicio']);
  }

}
