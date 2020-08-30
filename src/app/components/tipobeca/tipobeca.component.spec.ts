import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipobecaComponent } from './tipobeca.component';

describe('TipobecaComponent', () => {
  let component: TipobecaComponent;
  let fixture: ComponentFixture<TipobecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipobecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipobecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
