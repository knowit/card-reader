import { Client } from 'pg';
import { getEnvironmentVariabel } from '../config';

const client = new Client({
  user: getEnvironmentVariabel('SHARING_POSTGRES_USER'),
  host: getEnvironmentVariabel('SHARING_POSTGRES_DOMAIN'),
  database: getEnvironmentVariabel('SHARING_POSTGRES_DATABASE'),
  password: getEnvironmentVariabel('SHARING_POSTGRES_PASSWORD'),
  port: getEnvironmentVariabel('SHARING_POSTGRES_PORT'),
});

client.connect();

export const executeQuery = async q => {
  try {
    const result = await client.query(q.text, q.values);
    return result.rows;
  } catch (err) {
    console.error(err.stack);
  }
};
