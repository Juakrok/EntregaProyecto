import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipaService } from 'src/app/services/participa.service';
import { ComentarEvento } from 'src/interfaces/comentarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentar-evento',
  templateUrl: './comentar-evento.page.html',
  styleUrls: ['./comentar-evento.page.scss'],
})
export class ComentarEventoPage implements OnInit {
  eventoId: number;
  comentarios: ComentarEvento[] = [];

  constructor(
    private route: ActivatedRoute,
    private participacionservice: ParticipaService,
    private router: Router
  ) {
    this.eventoId = Number(this.route.snapshot.paramMap.get('eventoId'));
  }

  ngOnInit() {
    this.loadComentarios();
    // Opcional: actualizar los comentarios cada cierto tiempo
    setInterval(() => {
      this.participacionservice.updateComentarios(this.eventoId);
    }, 5000); // Cada 5 segundos
  }

  loadComentarios() {
    this.participacionservice.comentarios$.subscribe(comentarios => {
      this.comentarios = comentarios;
    });
    this.participacionservice.updateComentarios(this.eventoId); // Carga inicial
  }

  addComentario(nuevoComentario: ComentarEvento) {
    this.participacionservice.guardarComentario(nuevoComentario).subscribe(() => {
      this.participacionservice.updateComentarios(this.eventoId);
    });
  }

  regresar(){
    this.router.navigate(['/tabs/tab3']);
  }
}
