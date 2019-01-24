import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataViewService} from '../../../shared/services/data-view.service';
import {DataView} from '../../../shared/model/data-view';

@Component({
  selector: 'app-data-view-form',
  templateUrl: './data-view-form.component.html',
  styleUrls: ['./data-view-form.component.css']
})
export class DataViewFormComponent implements OnInit {

  sourceId: string;
  dataView: DataView;
  dataViewForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _formBuilder: FormBuilder,
              private dataViewService: DataViewService ) { }

  ngOnInit() {
    this.sourceId = this.route.snapshot.params['sourceId'];
    this.dataViewForm = this._formBuilder.group({
      id: ['', Validators.required],
      mapFunction: [''],
      reduceFunction: ['']
    });
  }

  submit() {
    this.dataView = this.dataViewForm.getRawValue();
    this.dataViewService.addView(this.sourceId, this.dataView).subscribe();

    this.router.navigate(['odsConfig/datasources/', this.sourceId, 'details']).then(err => {
      console.log(err);
    });
  }

}
