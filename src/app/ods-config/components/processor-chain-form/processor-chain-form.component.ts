import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProcessorSpecification} from '../../../shared/model/processor-specification';
import {Observable} from 'rxjs';
import {ProcessorSpecificationService} from '../../../shared/services/processor-specification.service';
import {map} from 'rxjs/operators';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-processor-chain-form',
  templateUrl: './processor-chain-form.component.html',
})
export class ProcessorChainFormComponent implements OnInit {

  obj: Observable<ProcessorSpecification[]>;
  Object: ObjectConstructor;

  timeUnits = ['MINUTES', 'SECONDS', 'MILISECONDS', 'HOURS'];

  processorChainForm: FormGroup;
  processorArray: FormArray;

  filterFormGroup: FormGroup;
  filterFormArray: FormArray;
  filterArray: Observable<ProcessorSpecification[]>;

  adapterFormGroup: FormGroup;
  adapterArray: Observable<ProcessorSpecification[]>;
  adapterArgumentsArray: Observable<KeyValue<string, any>>;

  exIntervalBool: Boolean = false;
  executionIntervalForm: FormGroup;

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
    this.executionIntervalForm = new FormGroup({});
    this.processorChainForm = this._formBuilder.group({
      id: ['', Validators.required],
      processors: this.processorArray,
      executionInterval: null
    });
    this.setExecutionInterval();


    this.obj = this.processorSpecService.getAllProcessorSpecifications();
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
    this.executionIntervalForm.addControl('period', new FormControl('', [
      Validators.min(1), Validators.max(60), Validators.pattern('[0-9]*') ]
      ));
    this.executionIntervalForm.addControl('unit', new FormControl());
  }

  createProcessor() {
    return this._formBuilder.group({
      name: [''],
      arguments: this._formBuilder.group({})
    });
  }

  addFilter() {
    this.filterFormArray.push(this.createProcessor());
  }

  removeFilter(index: number) {
    this.filterFormArray.removeAt(index);
  }

  // getArgumentsFromAdapter(name: string) {
  //   const args = new Array<KeyValue<string, string>>();
  //   this.adapterArray.subscribe(
  //     data => {
  //       const o = data[index].argumentTypes;
  //       const keys = Object.keys(o);
  //       const values = Object.values(o);
  //     }
  //   );
  // }
  // getArgumetnsFromFilter(name: string) {
  //
  // }

  test() {
    this.obj.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        console.log('from ' + i);
        const o = data[i].argumentTypes;
        Object.keys(o).map(e => console.log(e));
        Object.values(o).map(e => console.log(e));

      }
    });
  }


  save() {
    if (this.processorChainForm.valid) {
      this.processorArray.push(this.adapterFormGroup);
      for (let i = 0; i < this.filterFormArray.length; i++) {
        this.processorArray.push(this.filterFormArray.at(i));
      }
      if (this.exIntervalBool) {
        if (this.executionIntervalForm.valid) {
          this.processorChainForm.setControl('executionIntervalForm', this.executionIntervalForm);
        } else {
          console.log('ERROR: executionIntervalForm not valid');
        }
      }
    }
    console.log(this.processorChainForm.getRawValue());
  }

}
