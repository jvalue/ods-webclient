import { Injectable } from '@angular/core';
import {Configuration} from '../model/configuration';
import {DataSource} from '../model/dataSource';
import {DataSourceService} from './data-source.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  configs: Configuration[];

  constructor(private dataSourceService: DataSourceService) { }

  getConfigurationFromDataSource(dataSource: DataSource): Configuration {
    const config = new Configuration();
    config.dataSource = dataSource;
    return config;
  }

  getAllConfigurations(): Observable<Configuration[]> {
    // const configs = new Array<Configuration>();
    this.dataSourceService.getDataSource().subscribe(
        (data: DataSource[]) => {
          for (let i = 0; i < data.length; i++) {
            this.configs[i].dataSource = data[i];
          }
        });
    return Observable.create(this.configs);
  }

}
