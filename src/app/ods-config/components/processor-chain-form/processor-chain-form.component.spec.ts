import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorChainFormComponent } from './processor-chain-form.component';

describe('ProcessorChainFormComponent', () => {
  let component: ProcessorChainFormComponent;
  let fixture: ComponentFixture<ProcessorChainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorChainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorChainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
