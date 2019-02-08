import defined from 'defined';

export function createErrorPayload(status, message, json) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      if (res.status === 204) {
        return resolve();
      }
      // Temporary until API changes to return representation
      const location = res.headers.get('Location');
      if (res.status === 201 && location) {
        if (!location) {
          resolve();
        }
        return resolve(location);
      }
      return resolve(res.json());
    }
    return res
      .json()
      .then(json =>
        reject(
          createErrorPayload(
            res.status,
            defined(json.message, res.statusText),
            json,
          ),
        ),
      )
      .catch(reject);
  });
}
const baseUrl = '/api';
export const fetchEvents = () =>
  fetch(`${baseUrl}/events`).then(resolveJsonOrRejectWithError);
export const fetchEvent = eventId =>
  fetch(`${baseUrl}/events/${eventId}`).then(resolveJsonOrRejectWithError);
export const fetchPerson = cardId =>
  fetch(`${baseUrl}/persons/${cardId}`).then(resolveJsonOrRejectWithError);
export const fetchCompanies = () =>
  fetch(`${baseUrl}/companies`).then(resolveJsonOrRejectWithError);

export const updatePerson = (id, body) =>
  fetch(`${baseUrl}/persons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const participate = body =>
  fetch(`${baseUrl}/participate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
