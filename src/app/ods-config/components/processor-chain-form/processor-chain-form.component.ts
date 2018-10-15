import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProcessorSpecification} from '../../../shared/model/processor-specification';
import {Observable} from 'rxjs';
import {ProcessorSpecificationService} from '../../../shared/services/processor-specification.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-processor-chain-form',
  templateUrl: './processor-chain-form.component.html',
})
export class ProcessorChainFormComponent implements OnInit {

  timeUnits = ['MINUTES', 'SECONDS', 'MILISECONDS', 'HOURS'];

  processorChainForm: FormGroup;
  processorArray: FormArray;

  filterFormGroup: FormGroup;
  filterFormArray: FormArray;
  filterArray: Observable<ProcessorSpecification[]>;

  adapterFormGroup: FormGroup;
  adapterArray: Observable<ProcessorSpecification[]>;

  exIntervalBool: Boolean = false;
  executionInterval: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private processorSpecService: ProcessorSpecificationService) {
  }

  ngOnInit() {
    this.filterArray = this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'FILTER')
    ));
    this.adapterArray = this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'SOURCE_ADAPTER')
    ));
    this.adapterFormGroup = this.createProcessor();
    this.filterFormArray = this._formBuilder.array([this.createProcessor()]);
    this.filterFormGroup = this._formBuilder.group({
      filters: this.filterFormArray
    });
    this.processorArray = new FormArray([]);
    this.executionInterval = new FormGroup({});
    this.processorChainForm = this._formBuilder.group({
      id: ['', Validators.required],
      processors: this.processorArray,
      executionInterval: null
    });
    this.setExecutionInterval();
  }

  filterByType(data: any, type: string) {
    const arr = new Array();
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === type) {
        arr.push(data[i]);
      }
    }
    return arr;
  }

  setExecutionInterval() {
    this.executionInterval.addControl('period', new FormControl('', [
      Validators.min(1), Validators.max(60), Validators.pattern('[0-9]*') ]
      ));
    this.executionInterval.addControl('unit', new FormControl());
  }

  createProcessor() {
    return this._formBuilder.group({
      name: [''],
      arguments: this._formBuilder.group({})
    });
  }

  addProcessor() {
    this.filterFormArray.push(this.createProcessor());
  }

  deleteProcessor(index: number) {
    this.filterFormArray.removeAt(index);
  }

  save() {
    if (this.processorChainForm.valid) {
      this.processorArray.push(this.adapterFormGroup);
      for (let i = 0; i < this.filterFormArray.length; i++) {
        this.processorArray.push(this.filterFormArray.at(i));
      }
      if (this.exIntervalBool) {
        if (this.executionInterval.valid) {
          this.processorChainForm.setControl('executionInterval', this.executionInterval);
        } else {
          console.log('ERROR: executionInterval not valid');
        }
      }
    }
    console.log(this.processorChainForm.getRawValue());
  }

}
