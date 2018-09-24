import {Component, OnInit} from '@angular/core';
import {DataSource} from '../../../shared/model/data-source';
import {DataSourceService} from '../../../shared/services/data-source.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-data-source-detail',
  templateUrl: './data-source-detail.component.html',
})
export class DataSourceDetailComponent implements OnInit {

  public dataSource: Observable<DataSource>;

  constructor(
    private datasourceService: DataSourceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['sourceId'];
    this.dataSource = this.datasourceService.getDataSourceById(id);
  }

}
