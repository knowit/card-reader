import { executeQuery } from './querySql';

const fetchPersonById = async id => {
  if (!id) {
    throw new Error({ status: 400 });
  }
  const query = {
    name: 'fetch-person-by-id',
    text: 'SELECT * FROM persons WHERE id = $1',
    values: [id],
  };
  const result = await executeQuery(query);
  if (result.length === 0) {
    throw new Error({ status: 400, message: 'No person with id found' });
  }
  return result[0];
};

const fetchPersonByCardId = async cardId => {
  if (!cardId) {
    throw new Error({ status: 404, message: 'No card id found' });
  }
  const query = {
    name: 'fetch-person-by-card-id',
    text: 'SELECT * FROM persons WHERE card_id = $1',
    values: [cardId],
  };
  const result = await executeQuery(query);
  if (result.length === 0) {
    throw new Error({ status: 400, message: 'No person with card id found' });
  }
  return result[0];
};

const updatePersonById = async (id, { first_name, last_name, company_id }) => {
  if (!first_name || !last_name || !company_id) {
    throw new Error({ status: 400 });
  }
  const insertQuery = {
    text:
      'UPDATE persons SET first_name = $1, last_name = $2, company_id = $3 WHERE ID = $4',
    values: [first_name, last_name, company_id, id],
  };
  const insertResult = await executeQuery(insertQuery);
  return insertResult;
};

const createPerson = async ({ first_name, last_name, company_id, card_id }) => {
  if (!first_name || !last_name || !company_id || !card_id) {
    throw new Error({ status: 400 });
  }
  const insertQuery = {
    text:
      'INSERT INTO persons (first_name, last_name, company_id, card_id) VALUES ($1, $2, $3, $4)',
    values: [first_name, last_name, company_id, card_id],
  };

  const insertResult = await executeQuery(insertQuery);
  return insertResult;
};

const fetchParticipation = async (person_id, event_id) => {
  const query = {
    name: 'fetch-participation-check',
    text: 'SELECT * FROM participation WHERE person_id = $1 AND event_id = $2',
    values: [person_id, event_id],
  };
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : undefined;
};

const addParticipation = async ({ person_id, event_id }) => {
  const participation = await fetchParticipation(person_id, event_id);
  if (participation) {
    throw new Error({ status: 400 });
  }

  const insertQuery = {
    text: 'INSERT INTO participation(person_id, event_id) VALUES($1, $2)',
    values: [person_id, event_id],
  };
  const insertResult = await executeQuery(insertQuery);
  return insertResult;
};

const fetchCompanies = async () => {
  const query = {
    name: 'fetch-companies',
    text: 'SELECT * FROM companies',
  };
  const result = await executeQuery(query);
  return result;
};

const fetchEvents = async () => {
  const query = {
    name: 'fetch-events',
    text: 'SELECT * FROM events',
  };
  const result = await executeQuery(query);
  return result;
};

const fetchEventById = async id => {
  if (!id) {
    throw new Error({ status: 400, message: 'No id sent to us' });
  }
  const query = {
    name: 'fetch-event-by-id',
    text: 'SELECT * FROM events WHERE id = $1',
    values: [id],
  };

  const result = await executeQuery(query);
  if (result.length === 0) {
    throw new Error({ status: 400, message: 'No event with id found' });
  }
  return result[0];
};

export {
  fetchPersonById,
  fetchPersonByCardId,
  fetchParticipation,
  addParticipation,
  updatePersonById,
  createPerson,
  fetchEvents,
  fetchEventById,
  fetchCompanies,
};
