import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DejarOpinionPage } from './dejar-opinion.page';

describe('DejarOpinionPage', () => {
  let component: DejarOpinionPage;
  let fixture: ComponentFixture<DejarOpinionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DejarOpinionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
