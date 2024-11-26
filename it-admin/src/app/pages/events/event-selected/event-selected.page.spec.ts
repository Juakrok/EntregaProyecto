import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSelectedPage } from './event-selected.page';

describe('EventSelectedPage', () => {
  let component: EventSelectedPage;
  let fixture: ComponentFixture<EventSelectedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSelectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
