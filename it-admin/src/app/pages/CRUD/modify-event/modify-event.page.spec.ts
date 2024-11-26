import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyEventPage } from './modify-event.page';

describe('ModifyEventPage', () => {
  let component: ModifyEventPage;
  let fixture: ComponentFixture<ModifyEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
