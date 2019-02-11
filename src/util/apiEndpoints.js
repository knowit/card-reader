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

export const fetchWithAuthorization = async (url, config = {}, forceAuth) => {
  return fetch(url, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const baseUrl = '/api';
export const fetchEvents = () =>
  fetchWithAuthorization(`${baseUrl}/events`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchEvent = eventId =>
  fetchWithAuthorization(`${baseUrl}/events/${eventId}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchPerson = cardId =>
  fetchWithAuthorization(`${baseUrl}/persons/${cardId}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchCompanies = () =>
  fetchWithAuthorization(`${baseUrl}/companies`).then(
    resolveJsonOrRejectWithError,
  );

export const updatePerson = (id, body) =>
  fetchWithAuthorization(`${baseUrl}/persons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);

export const participate = body =>
  fetchWithAuthorization(`${baseUrl}/participate`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);

export const fetchEventParticipants = eventId => {
  return fetchWithAuthorization(
    `${baseUrl}/events/${eventId}/participants`,
  ).then(resolveJsonOrRejectWithError);
};
