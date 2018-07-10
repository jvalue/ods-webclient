import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsConfigComponent } from './ods-config.component';

describe('OdsConfigComponent', () => {
  let component: OdsConfigComponent;
  let fixture: ComponentFixture<OdsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
