import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoAvisoPage } from './nuevo-aviso.page';

describe('NuevoAvisoPage', () => {
  let component: NuevoAvisoPage;
  let fixture: ComponentFixture<NuevoAvisoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
