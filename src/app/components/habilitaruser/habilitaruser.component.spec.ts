import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitaruserComponent } from './habilitaruser.component';

describe('HabilitaruserComponent', () => {
  let component: HabilitaruserComponent;
  let fixture: ComponentFixture<HabilitaruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitaruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
