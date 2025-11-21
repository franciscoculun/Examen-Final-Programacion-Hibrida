import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisoItemComponent } from './aviso-item.component';

describe('AvisoItemComponent', () => {
  let component: AvisoItemComponent;
  let fixture: ComponentFixture<AvisoItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AvisoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
