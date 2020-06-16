import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCitadosComponent } from './paciente-citados.component';

describe('PacienteCitadosComponent', () => {
  let component: PacienteCitadosComponent;
  let fixture: ComponentFixture<PacienteCitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteCitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
