import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IDataSource} from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getDataSource() {
    return this.http.get<IDataSource>('');
  }
}
