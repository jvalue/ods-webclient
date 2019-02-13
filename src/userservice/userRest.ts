import User from './user';

const USER_URL = 'http://localhost:8080/users';
const USERNAME = 'admin@adminland.de';
const PW = 'admin';

export function getAllUsers(): Promise<User[]> {
  return fetch(USER_URL, {
    mode: 'cors',
    headers: {
      Authorization: 'Basic ' + btoa(USERNAME + ':' + PW),
    },
  }).then(response => {
    if (!response.ok) {
      console.log('HTTP call failed: ' + response.status);
    }
    return response.json();
  });
}
