import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AbstractRestService} from './abstract-rest.service';

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
export class V1RestService extends AbstractRestService {

  constructor(private http: HttpClient) {
    super();
  }

  get(url: string): Observable<any> {
    return this.http.get(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  getV2(url: string): Observable<any> {
    return this.http.get(url);
  }


  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  delete(url: string) {
    return this.http.delete(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
