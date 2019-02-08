const BASE_URL = 'http://localhost:8080';
const USERNAME = 'admin@adminland.de';
const PW = 'admin';

export function get(url: string): Promise<any> {
  return fetch(BASE_URL + url, {
    mode: 'cors',
    headers: {
      Authorization: 'Basic ' + btoa(USERNAME + ':' + PW),
    },
  })
    .then(response => {
      return handleResponse(response);
    })
    .catch(error => handleFetchError(error));
}

export function post(url: string, entity: any): Promise<any> {
  return fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(USERNAME + ':' + PW),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entity),
  })
    .then(response => {
      return handleResponse(response);
    })
    .catch(error => handleFetchError(error));
}

export function del(url: string): Promise<any> {
  return fetch(BASE_URL + url, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic ' + btoa(USERNAME + ':' + PW),
    },
  })
    .then(response => {
      return handleResponse(response);
    })
    .catch(error => handleFetchError(error));
}

function handleResponse(response: Response): Promise<any> {
  if (!response.ok) {
    console.log(
      'HTTP Call failed: ' + response.status + ' ' + response.statusText
    );
  }
  return response.json();
}

function handleFetchError(error: Error) {
  console.log('Fetch Error: ' + error.message);
}
