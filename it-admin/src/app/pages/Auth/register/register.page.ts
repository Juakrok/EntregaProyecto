import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { adminNuevo } from 'src/interfaces/users';
import { validarRut } from 'src/app/Validators/rut-validator';
import { lettersAndSpacesValidator } from 'src/app/Validators/lettersAndSpacesValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registroForm: FormGroup;
  nuevoAdmin: adminNuevo = {
    nombre: "",
    email: "",
    password: "",
    rut: "",
    imagen: "",
    isActive: false
  };

  userdata: any;

  constructor(
    private router: Router,
    private loadingcontroller: LoadingController,
    private authservice: AuthService,
    private formbuilder: FormBuilder,
    private alertcontroller: AlertController
  ) {
    this.registroForm = this.formbuilder.group({
      'nombre': new FormControl<string>("", {
        validators: [
          Validators.required,
          Validators.minLength(3),
          lettersAndSpacesValidator
        ],
        nonNullable: true,
      }),
      'email': new FormControl<string>("", {
        validators: [
          Validators.required,
          Validators.email
        ],
        nonNullable: true,
      }),
      'rut': new FormControl<string>("", {
        validators: [
          Validators.required,
          validarRut
        ],
        nonNullable: true,
      }),
      'password': new FormControl<string>("", {
        validators: [
          Validators.required,
          Validators.minLength(8)
        ],
        nonNullable: true,
      }),
    });
  }

  // Crear el nuevo usuario
  crearUsuario() {
    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value); // Verificar que los datos del formulario son correctos

      this.authservice.GetUserByCorreo(this.registroForm.value.email).subscribe({
        next: (resp) => {
          console.log('Respuesta de GetUserByCorreo:', resp); // Verificar la respuesta

          // Si ya existe un usuario con el mismo correo, se muestra el error
          if (resp.length > 0) {
            this.registroForm.reset();
            this.errorDuplicidad();
          } else {
            console.log('Creando usuario...'); // Crear el usuario si no existe
            this.nuevoAdmin.nombre = this.registroForm.value.nombre;
            this.nuevoAdmin.email = this.registroForm.value.email;
            this.nuevoAdmin.rut = this.registroForm.value.rut;
            this.nuevoAdmin.password = this.registroForm.value.password;
            this.nuevoAdmin.isActive = true;
            this.authservice.CreateUser(this.nuevoAdmin).subscribe();
            this.registroForm.reset();
            this.mostrarMensaje();
            this.router.navigateByUrl('/login');

            
          }
        },
        error: (err) => {
          console.error("Error al verificar el correo", err); // Imprimir el error si ocurre en la consulta del correo
        }
      });
    } else {
      console.log('Formulario no válido', this.registroForm.errors); // Verificar errores de validación
    }
  }

  // Mostrar mensaje de éxito cuando el usuario es creado
  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      mode: 'ios',
      header: 'Usuario creado',
      message: `Bienvenid@ ${this.nuevoAdmin.nombre}`,
      buttons: ['OK']
    });
    await alerta.present();
  }

  // Mostrar alerta cuando el correo ya está registrado
  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error...',
      message: 'El correo ya existe',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl('/register');
        }
      }]
    });
    await alerta.present();
  }
}
