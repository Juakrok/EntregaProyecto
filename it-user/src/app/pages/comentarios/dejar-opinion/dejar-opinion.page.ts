import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipaService } from 'src/app/services/participa.service';
import { ComentarEvento } from 'src/interfaces/comentarios';


@Component({
  selector: 'app-dejar-opinion',
  templateUrl: './dejar-opinion.page.html',
  styleUrls: ['./dejar-opinion.page.scss'],
})
export class DejarOpinionPage {
  eventoId: number;
  comentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participacionservice: ParticipaService
  ) {
    this.eventoId = Number(this.route.snapshot.paramMap.get('eventoId'));
  }

  enviarComentario() {
    const comentarioData: ComentarEvento = {
      eventoId: this.eventoId,
      texto: this.comentario, // Asegúrate de usar 'texto' en lugar de 'comentario'
      email: sessionStorage.getItem('email') || ''
    };

    this.participacionservice.guardarComentario(comentarioData).subscribe(
      () => {
        this.router.navigate(['/comentar-evento', { eventoId: this.eventoId }]);
      },
      (error) => {
        console.error("Error al guardar el comentario", error);
      }
    );
  }

  regresar(){
    this.router.navigate(['/tabs/tab3']);
  }
}
