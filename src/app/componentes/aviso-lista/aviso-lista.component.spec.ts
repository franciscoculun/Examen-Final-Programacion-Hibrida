import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisoListaComponent } from './aviso-lista.component';

describe('AvisoListaComponent', () => {
  let component: AvisoListaComponent;
  let fixture: ComponentFixture<AvisoListaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AvisoListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
