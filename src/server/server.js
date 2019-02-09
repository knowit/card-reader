import App from '../containers/App/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import WebSocket from 'ws';
import bodyParser from 'body-parser';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import Html from './Html';
import config from '../config';
import { executeQuery } from './querySql';

const app = express();
app.use(compression());

app.use(
  express.static(process.env.RAZZLE_PUBLIC_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // One year
  }),
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.disable('x-powered-by');

const renderHtmlString = () => renderToString(<Html />);

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({ port: config.websocketPort }); //{ on: () => {}};

wss.on('connection', ws => {
  ws.on('message', message => {
    ws.send(message);
  });
});

app.get('/card_recorder', (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.send(400);
    return;
  }
  wss.clients.forEach(client => {
    client.send(id);
  });
  res.send(200);
});

//Events

app.get('/api/events/:id', async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  }
  const query = {
    name: 'fetch-event-by-id',
    text: 'SELECT * FROM events WHERE id = $1',
    values: [req.params.id],
  };
  const result = await executeQuery(query);
  if (result.length === 0) {
    res.sendStatus(400);
  }
  res.send(result[0]);
});

app.get('/api/events', async (req, res) => {
  const query = {
    name: 'fetch-events',
    text: 'SELECT * FROM events',
  };
  const result = await executeQuery(query);
  res.send(result);
});

//Companies

app.get('/api/companies', async (req, res) => {
  const query = {
    name: 'fetch-companies',
    text: 'SELECT * FROM companies',
  };
  const result = await executeQuery(query);
  res.send(result);
});

//Person

app.get('/api/persons/:cardId', async (req, res) => {
  if (!req.params.cardId) {
    res.sendStatus(400);
  }
  const query = {
    name: 'fetch-person-by-card-id',
    text: 'SELECT * FROM persons WHERE card_id = $1',
    values: [req.params.cardId],
  };
  const result = await executeQuery(query);
  if (result.length === 0) {
    res.sendStatus(404);
  }
  res.send(result[0]);
});

// Participation
app.put('/api/persons/:personId', async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const company_id = req.body.company_id;
  console.log(req.body);
  if (!first_name || !last_name || !company_id) {
    res.sendStatus(400);
    return;
  }
  const insertQuery = {
    text:
      'UPDATE persons SET first_name = $1, last_name = $2, company_id = $3 WHERE ID = $4',
    values: [first_name, last_name, company_id, req.params.personId],
  };
  const insertResult = await executeQuery(insertQuery);
  res.send(insertResult);
});

// Participation
app.post('/api/participate', async (req, res) => {
  var person_id = req.body.person_id;
  var event_id = req.body.event_id;
  const query = {
    name: 'fetch-participation-check',
    text: 'SELECT * FROM participation WHERE person_id = $1 AND event_id = $2',
    values: [person_id, event_id],
  };
  const result = await executeQuery(query);
  if (result && result.length > 0) {
    res.sendStatus(400);
    return;
  }

  const insertQuery = {
    text: 'INSERT INTO participation(person_id, event_id) VALUES($1, $2)',
    values: [person_id, event_id],
  };
  const insertResult = await executeQuery(insertQuery);
  res.send(insertResult);
});

app.get('*', (req, res) => {
  const htmlString = renderHtmlString();
  res.send(`<!doctype html>\n${htmlString}`);
});

export default app;
