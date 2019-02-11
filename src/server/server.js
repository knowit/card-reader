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
import {
  fetchPersonById,
  fetchPersonByCardId,
  fetchParticipation,
  addParticipation,
  updatePersonById,
  createPerson,
  fetchEvents,
  fetchEventById,
  fetchCompanies,
  fetchParticipantsByEventId,
} from './queries';

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
let wss = new WebSocketServer({ port: config.websocketPort }); //{ on: () => {}};

wss.on('connection', ws => {
  ws.on('message', message => {
    ws.send(message);
  });
});

app.get('/card_recorder/:cardId', (req, res) => {
  const id = req.params.cardId;
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

app.get('/api/events', async (req, res) => {
  try {
    const result = await fetchEvents();
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const result = await fetchEventById(req.params.id);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.get('/api/events/:id/participants', async (req, res) => {
  try {
    const result = await fetchParticipantsByEventId(req.params.id);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

//Companies

app.get('/api/companies', async (req, res) => {
  try {
    const result = await fetchCompanies();
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

//Person

app.get('/api/persons/:cardId', async (req, res) => {
  try {
    const result = await fetchPersonByCardId(req.params.cardId);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.put('/api/persons/:personId', async (req, res) => {
  try {
    const insertResult = await updatePersonById(
      req.params.personId,
      req.body,
      res,
    );
    const result = await fetchPersonById(req.params.personId);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.post('/api/persons', async (req, res) => {
  try {
    await createPerson(req.body);
    const result = await fetchPersonByCardId(req.body.card_id);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

// Participation
app.post('/api/participate', async (req, res) => {
  try {
    await addParticipation(req.body);
    const result = fetchParticipation(req.body.person_id, req.body.event_id);
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.get('*', (req, res) => {
  const htmlString = renderHtmlString();
  res.send(`<!doctype html>\n${htmlString}`);
});

export default app;
