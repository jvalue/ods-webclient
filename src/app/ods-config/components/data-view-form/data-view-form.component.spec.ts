import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewFormComponent } from './data-view-form.component';

describe('DataViewFormComponent', () => {
  let component: DataViewFormComponent;
  let fixture: ComponentFixture<DataViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataViewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
