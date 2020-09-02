import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarticketsComponent } from './listartickets.component';

describe('ListarticketsComponent', () => {
  let component: ListarticketsComponent;
  let fixture: ComponentFixture<ListarticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
