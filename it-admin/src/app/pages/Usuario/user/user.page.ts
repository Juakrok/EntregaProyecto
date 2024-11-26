import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { administradores } from 'src/interfaces/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html', // Asegúrate de que exista este archivo
  styleUrls: ['./user.page.scss'], // Asegúrate de que exista este archivo
})
export class UserPage implements OnInit{

  admin:administradores|null= null;

  constructor(
    private router:Router,
    private authservice:AuthService
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
  }

  loadUserData() {
    const email = sessionStorage.getItem('email'); // Obtener el correo del usuario
    console.log('Correo obtenido:', email);
  
    if (email) {
      this.authservice.GetUserByCorreo(email).subscribe({
        next: (resp: administradores[]) => {
          if (resp.length > 0) {
            this.admin = resp[0]; // Usar el primer resultado
            console.log('Usuario cargado');
          } else {
            console.warn('No se encontró un usuario con este correo.');
            this.admin = null; // Asegúrate de manejar el caso cuando no se encuentra el usuario
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        },
      });
    } else {
      console.warn('No se encontró el correo en sessionStorage.');
    }
  }
  
  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }


  getProfileImage(fotoPerfil: string | null | undefined): string {
    // Si no hay foto de perfil, se usa una imagen predeterminada
    if (!fotoPerfil) {
      return 'assets/imagenes/default-image.webp';
    }
  
    // Verifica si ya contiene el prefijo "data:image/png;base64,"
    if (fotoPerfil.startsWith('data:image/')) {
      return fotoPerfil; // Ya está en el formato correcto
    }
  
    // Añade el prefijo si falta
    return `data:image/png;base64,${fotoPerfil}`;
  }

} // Clase exportada correctamente
