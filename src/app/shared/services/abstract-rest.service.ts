import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractRestService {

  constructor() {
  }

  abstract get(url: string): Observable<any>;

  abstract post(url: string, data: any): Observable<any>;

  abstract put(url: string, data: any): Observable<any>;

  abstract delete(url: string);

  abstract handleError(error: any);

}
