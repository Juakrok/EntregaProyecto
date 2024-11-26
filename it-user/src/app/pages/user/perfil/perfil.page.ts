import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Users | null = null; // Usuario cargado desde el backend

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
  }

  /**
   * Cargar datos del usuario basado en el correo almacenado en sessionStorage
   */
  loadUserData() {
    const email = sessionStorage.getItem('email'); // Obtener el correo del usuario
    console.log('Correo obtenido:', email);

    if (email) {
      this.auth.GetUserByCorreo(email).subscribe({
        next: (resp: Users[]) => {
          if (resp.length > 0) {
            this.usuario = resp[0]; // Usar el primer resultado
            console.log('Usuario cargado');
          } else {
            console.warn('No se encontró un usuario con este correo.');
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

  /**
   * Navegar de vuelta a la página principal
   */
  goBack() {
    this.router.navigate(['/tabs/tab1']); // Ajusta la ruta según sea necesario
  }

  /**
   * Navegar a la página de edición del perfil
   */
  editarPerfil() {
    this.router.navigate(['/editar']);
  }

  /**
   * Acción para ver los eventos registrados
   */
  verEventoRegistrado() {
    console.log('Acción de ver evento registrado');
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
  
}
