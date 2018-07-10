import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '../module/DataSource';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getDataSource() {
    return this.http.get<DataSource>('');
  }
}
