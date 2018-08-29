import { Injectable } from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(url: string, data: any): Observable<any> {
    return this.http.delete(url, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
