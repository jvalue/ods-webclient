import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceDetailComponent } from './data-source-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('DataSourceDetailComponent', () => {
  let component: DataSourceDetailComponent;
  let fixture: ComponentFixture<DataSourceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
