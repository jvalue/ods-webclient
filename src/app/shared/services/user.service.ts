import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  odsBaseUrl = 'http://localhost:8080/ods/api/v1';
  // private users: User[]
  // private myself: User;


  constructor(private service: BasicRestService) { }

  getAllUsers(): Observable<User[]> {
    return this.service.get(this.odsBaseUrl + '/users');
  }
  getMyself() {
    this.service.get(this.odsBaseUrl + '/me')
      .subscribe((data: any) => console.log(data));
  }
  //
  // addUser(userName: string, password: string) {}
  //
  // getUserById(userId: string): User {
  //   return null;
  // }
  //
  //
  // removeUser(userId: string) {}

}
