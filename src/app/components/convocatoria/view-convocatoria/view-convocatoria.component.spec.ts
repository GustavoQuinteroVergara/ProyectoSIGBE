import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConvocatoriaComponent } from './view-convocatoria.component';

describe('ViewConvocatoriaComponent', () => {
  let component: ViewConvocatoriaComponent;
  let fixture: ComponentFixture<ViewConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
