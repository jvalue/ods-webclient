import { useBearer } from '@/keycloak';

const TRANSFORMATION_URL = 'http://localhost:4000/job';

export async function transformData(inputFunc: string): Promise<any> {
  const token = await useBearer().catch(error => {
    console.error('Unable to get keycloak token. Error: ' + error);
  });

  if (token === undefined) {
    return;
  }

  return fetch(TRANSFORMATION_URL, {
    method: 'POST',
    mode: 'cors',
    body: inputFunc,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  }).then(response => {
    return response.json();
  });
}

