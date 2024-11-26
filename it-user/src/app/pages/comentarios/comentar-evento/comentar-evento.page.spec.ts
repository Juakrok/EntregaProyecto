import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentarEventoPage } from './comentar-evento.page';

describe('ComentarEventoPage', () => {
  let component: ComentarEventoPage;
  let fixture: ComponentFixture<ComentarEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
