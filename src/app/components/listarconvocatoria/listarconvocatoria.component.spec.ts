import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarconvocatoriaComponent } from './listarconvocatoria.component';

describe('ListarconvocatoriaComponent', () => {
  let component: ListarconvocatoriaComponent;
  let fixture: ComponentFixture<ListarconvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarconvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
