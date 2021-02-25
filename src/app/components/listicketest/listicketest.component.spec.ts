import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListicketestComponent } from './listicketest.component';

describe('ListicketestComponent', () => {
  let component: ListicketestComponent;
  let fixture: ComponentFixture<ListicketestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListicketestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListicketestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
