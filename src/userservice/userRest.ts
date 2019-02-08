import User from './user';
import * as BasicRestService from '@/shared/basicRest';

const USER_URL = '/users';

export function getAllUsers(): User[] {
  let users: User[] = [];
  BasicRestService.get(USER_URL).then(responseData => {
    //add all entries to user[]
  });

  return users;
}
