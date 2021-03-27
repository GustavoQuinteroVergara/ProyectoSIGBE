import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitadomiciliariaComponent } from './visitadomiciliaria.component';

describe('VisitadomiciliariaComponent', () => {
  let component: VisitadomiciliariaComponent;
  let fixture: ComponentFixture<VisitadomiciliariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitadomiciliariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitadomiciliariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
