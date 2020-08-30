import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearusuariologinComponent } from './crearusuariologin.component';

describe('CrearusuariologinComponent', () => {
  let component: CrearusuariologinComponent;
  let fixture: ComponentFixture<CrearusuariologinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearusuariologinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearusuariologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
