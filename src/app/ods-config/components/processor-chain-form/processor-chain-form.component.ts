import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProcessorSpecification} from '../../../shared/model/processor-specification';
import {ProcessorSpecificationService} from '../../../shared/services/processor-specification.service';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';

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
  filterArray: ProcessorSpecification[] = [];
  currentFilter: any;
  filterConfigOptions: string[];
  filterConfigFormArray: FormArray;

  adapterFormGroup: FormGroup;
  adapterArray: ProcessorSpecification[] = [];
  currentAdapter: any;
  adapterConfigFormArray: FormArray;
  adapterConfigOptions: string[];

  exIntervalBool: Boolean = false;
  executionIntervalForm: FormGroup;




  constructor(private _formBuilder: FormBuilder,
              private processorSpecService: ProcessorSpecificationService) {
  }

  ngOnInit() {
    this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'FILTER')
    )).subscribe(value => {
      this.filterArray = value;
    });

    this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'SOURCE_ADAPTER')
    )).subscribe(value => {
      this.adapterArray = value;
    });

    this.adapterConfigFormArray = this._formBuilder.array([]);
    this.adapterFormGroup = this.createProcessor();

    this.filterConfigFormArray = this._formBuilder.array([]);
    this.filterFormArray = this._formBuilder.array([this.createFilter()]);
    this.filterFormGroup = this._formBuilder.group({
      filters: this.filterFormArray
    });
    this.processorArray = new FormArray([]);
    this.processorChainForm = this._formBuilder.group({
      id: ['', Validators.required],
      processors: this.processorArray,
      executionInterval: null
    });
    this.executionIntervalForm = new FormGroup({});
    this.setExecutionInterval();
  }

  filterByType(data: any, type: string) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === type) {
        arr.push(data[i]);
      }
    }
    return arr;
  }

  setExecutionInterval() {
    this.executionIntervalForm.addControl('period', new FormControl('1', [
      Validators.min(1), Validators.max(60), Validators.pattern('[0-9]*')]
    ));
    this.executionIntervalForm.addControl('unit', new FormControl());
  }

  createProcessor() {
    return this._formBuilder.group({
      name: [''],
      arguments: this.adapterConfigFormArray,
    });
  }

  createFilter() {
    return this._formBuilder.group({
      name: [''],
      arguments: this.filterConfigFormArray,
    });
  }

  addFilter() {
    this.filterFormArray.push(this.createFilter());
  }

  removeFilter(index: number) {
    this.filterFormArray.removeAt(index);
    while (this.filterConfigFormArray.length > 0) {
      this.filterConfigFormArray.removeAt(0);
    }
  }

  updateAdapterSettings(adapterName: string) {

    let adapter = null;
    for (const adap of this.adapterArray) {
      if (adap['name'] === adapterName) {
        adapter = adap;
      }
    }
    if (isNullOrUndefined(adapter)) {
      throw Error('Failed to locate the adapter in the adapterArray.');
    }

    this.currentAdapter = adapter;
    this.adapterConfigOptions = Object.keys(adapter.argumentTypes);

    while (this.adapterConfigFormArray.length > 0) {
      this.adapterConfigFormArray.removeAt(0);
    }

    for (const type of this.adapterConfigOptions) {
      const formOptions: any = {};
      formOptions[type] = [''];
      this.adapterConfigFormArray.push(this._formBuilder.group(formOptions));
    }

  }

  updateFilterArguments(filterName: string) {
    let filter = null;
    for (const filt of this.filterArray) {
      if (filt['name'] === filterName) {
        filter = filt;
      }
    }
    if (isNullOrUndefined(filter)) {
      throw Error('Failed to locate the adapter in the adapterArray.');
    }
    this.currentFilter = filter;
    this.filterConfigOptions = Object.keys(filter.argumentTypes);
    console.log(this.filterConfigOptions);

    // while (this.adapterConfigFormArray.length > 0) {
    //   this.adapterConfigFormArray.removeAt(0);
    // }
    //
    // for (const type of this.filterConfigOptions) {
    //   const formOptions: any = {};
    //   formOptions[type] = [''];
    //   this.filterConfigFormArray.push(this._formBuilder.group(formOptions));
    // }
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
