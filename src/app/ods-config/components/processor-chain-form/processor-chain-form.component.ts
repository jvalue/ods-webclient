import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProcessorSpecification} from '../../../shared/model/processor-specification';
import {ProcessorSpecificationService} from '../../../shared/services/processor-specification.service';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {ProcessorChainService} from '../../../shared/services/processor-chain.service';
import {ProcessorChain} from '../../../shared/model/processor-chain';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-processor-chain-form',
  templateUrl: './processor-chain-form.component.html',
})
export class ProcessorChainFormComponent implements OnInit {

  /*execution Interval */
  timeUnits = ['MINUTES', 'SECONDS', 'MILLISECONDS', 'HOURS'];
  exIntervalBool: Boolean = true;
  executionIntervalForm: FormGroup;

  /*Name of ProcessorChain*/
  sourceId: string;
  currentFilterNumber = 0;

  /*Basic ProcessorChain*/
  processorChain: ProcessorChain;
  processorChainForm: FormGroup;
  processorArray: FormArray;

  /*Adapter as first processor in ProcessorChain*/
  adapterSpecArray: ProcessorSpecification[] = [];
  currentAdapter: any;
  adapterFormGroup: FormGroup;
  adapterConfigFormArray: FormArray;
  adapterConfigOptions: string[];

  /*Filter as processor array*/
  filterSpecArray: ProcessorSpecification[] = [];
  currentFilterArray: ProcessorSpecification[] = [];
  filterFormGroup: FormGroup;
  filterFormArray: FormArray;

  /*Placeholder for FilterConfigForms*/
  filterConfigFormArray: FormArray[] = new Array();
  filterConfigOptions: string[];

  /*saves all FilterConfigForms */
  filterFormArrayForConfigFormArrays: FormArray;
  filterConfigOptionsArray: string[][] = [];


  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private processorSpecService: ProcessorSpecificationService,
              private processorChainService: ProcessorChainService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sourceId = this.route.snapshot.params['sourceId'];

    /*Filter Specifications into Arrays*/
    this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'FILTER')
    )).subscribe(value => {
      this.filterSpecArray = value;
    });

    this.processorSpecService.getAllProcessorSpecifications().pipe(map(
      data => this.filterByType(data, 'SOURCE_ADAPTER')
    )).subscribe(value => {
      this.adapterSpecArray = value;
    });

    this.adapterConfigFormArray = this._formBuilder.array([]);
    this.adapterFormGroup = this.createAdapter();

    // this.filterConfigFormArray[0] = this._formBuilder.array([]);
    this.filterFormArrayForConfigFormArrays = this._formBuilder.array([]);
    this.filterFormArray = this._formBuilder.array([this.createFilter()]);
    this.filterFormGroup = this._formBuilder.group({
      filters: this.filterFormArray
    });
    this.currentFilterArray.push(new ProcessorSpecification);

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


  /*EXECUTION INTERVAL*/
  setExecutionInterval() {
    this.executionIntervalForm.addControl('period', new FormControl('1', [
      Validators.min(1), Validators.max(60), Validators.pattern('[0-9]*')]
    ));
    this.executionIntervalForm.addControl('unit', new FormControl());
  }

  createAdapter() {
    return this._formBuilder.group({
      name: [''],
      arguments: this.adapterConfigFormArray,
    });
  }

  createFilter() {
    this.filterConfigFormArray.push(this._formBuilder.array([]));
    const newFilter =  this._formBuilder.group({
      name: [''],
      arguments: this.filterConfigFormArray[this.currentFilterNumber]
    });
    /*Increment currentFilterNumber after creating a filterConfigFormArray*/
    this.currentFilterNumber++;
    return newFilter;
  }

  addFilter() {
    /*create empty filter*/
    this.filterFormArray.push(this.createFilter());
    this.currentFilterArray.push(new ProcessorSpecification);
    this.filterConfigOptionsArray.push(this.filterConfigOptions);
  }

  removeFilter(index: number) {
    this.currentFilterNumber--;
    this.filterFormArray.removeAt(index);

    /*Remove filter from Arrays*/
    const newFilterArray: ProcessorSpecification[] = [];
    const newFilterConfigOptionsArray: string[][] = [];
    const newFilterConfigFormArray = [];
    let i = 0;
    for (const filter of this.currentFilterArray) {
      if (i !== index ) {
        newFilterArray.push(filter);
        newFilterConfigOptionsArray.push(this.filterConfigOptionsArray[i]);
        newFilterConfigFormArray[index] = this.filterConfigFormArray[index];
      }
      i++;
    }
    this.currentFilterArray = newFilterArray;
    this.filterConfigOptionsArray = newFilterConfigOptionsArray;
    this.filterConfigFormArray = newFilterConfigFormArray;
  }

  updateAdapterSettings(adapterName: string) {

    let adapter = null;
    for (const adap of this.adapterSpecArray) {
      if (adap['name'] === adapterName) {
        adapter = adap;
      }
    }
    if (isNullOrUndefined(adapter)) {
      throw Error('Failed to locate the adapter in the adapterSpecArray.');
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

  updateFilterArguments(filterName: string, index: number) {
    let filter = null;
    for (const filt of this.filterSpecArray) {
      if (filt['name'] === filterName) {
        filter = filt;
      }
    }
    if (isNullOrUndefined(filter)) {
      throw Error('Failed to locate the filter in the filterSpecArray.');
    }

    this.currentFilterArray[index] = filter;
    this.filterConfigOptionsArray[index] = Object.keys(filter.argumentTypes);

    /*Clears filter Config Form at index*/
    while (this.filterConfigFormArray[index].length > 0) {
      this.filterConfigFormArray[index].removeAt(0);
    }

    for (const type of this.filterConfigOptionsArray[index]) {
      const formOptions: any = {};
      formOptions[type] = [''];
      this.filterConfigFormArray[index].push(this._formBuilder.group(formOptions));
    }
  }

  save() {
    if (this.processorChainForm.valid) {
      this.processorArray.push(this.adapterFormGroup);
      for (let i = 0; i < this.filterFormArray.length; i++) {
        this.processorArray.push(this.filterFormArray.at(i));
      }
      if (this.exIntervalBool) {
        if (this.executionIntervalForm.valid) {
          this.processorChainForm.setControl('executionInterval', this.executionIntervalForm);
        } else {
          console.log('ERROR: executionIntervalForm not valid');
        }
      }
    }
    this.processorChain = this.processorChainForm.getRawValue();
    this.processorChainService.addProcessorChain(this.sourceId, this.processorChain).subscribe();

    this.router.navigate(['odsConfig/datasources/', this.sourceId, 'details']).then(err => {
      console.log(err);
    });
  }


}
