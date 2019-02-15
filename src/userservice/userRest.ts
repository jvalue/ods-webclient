import User from './user';

const USER_URL = 'http://localhost:8080/users';
const USERNAME = 'admin@adminland.de';
const PW = 'admin';

const headers: Headers = new Headers({
  Authorization: 'Basic ' + btoa(USERNAME + ':' + PW),
});

export function getAllUsers(): Promise<User[]> {
  return fetch(USER_URL, {
    mode: 'cors',
    headers,
  }).then(response => {
    if (!response.ok) {
      console.log('GET call failed: ' + response.status + response.statusText);
    }
    return response.json();
  });
}

export function addUser(user: User): Promise<User> {
  const postHeaders = new Headers(headers);
  postHeaders.append('Content-Type', 'application/json');
  return fetch(USER_URL, {
    method: 'POST',
    mode: 'cors',
    headers: postHeaders,
    body: JSON.stringify(user),
  }).then(response => {
    if (!response.ok) {
      response.json().then(r => console.log(r));
      console.log('POST failed ' + response.status);
    }
    return response.json();
  });
}

export function deleteUserById(id: string): Promise<number> {
  return fetch(USER_URL + '/' + id, {
    mode: 'cors',
    method: 'DELETE',
    headers,
  }).then(response => {
    if (!response.ok) {
      console.log('DELETE failed: ' + response.status);
    }
    return response.status;
  });
}
