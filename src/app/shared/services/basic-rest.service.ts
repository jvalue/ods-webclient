import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

const headerParams = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Authorization' : String('Basic ' + btoa('admin@adminland.com:admin123'))
};

const requestOptions = {
  headers: new HttpHeaders(headerParams)
};

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
