import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AbstractRestService} from './abstract-rest.service';

const headerParams = {
  'Authorization': String('Basic ' + btoa('admin@adminland.com:admin123'))
};

const requestOptions = {
  headers: new HttpHeaders(headerParams)
};

@Injectable({
  providedIn: 'root'
})
export class V2RestService extends AbstractRestService {

  constructor(private http: HttpClient) {
    super();
  }

  get(url: string): Observable<any> {
    console.log(url);
    return this.http.get(url, requestOptions)
      .pipe(
        map(data => {
          const obs = new Array();
          for ( let i = 0; i < data['data'].length; i++ ) {
            obs.push(data['data'][i]['attributes']);
          }
          console.log(obs);
          return obs;
          }
        )
      )
      .pipe(catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    console.log(data);
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
