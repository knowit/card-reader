import App from '../containers/App/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import WebSocket from 'ws';
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

app.disable('x-powered-by')

const renderHtmlString = () =>
  renderToString(
    <Html />,
  );

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({port: config.websocketPort}); //{ on: () => {}};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    ws.send(message)
  })
});

app.get('/card_recorder', (req, res) => {
    const id = req.query.id;
    if (!id) {
      res.send(400);
      return;
    }
    wss.clients.forEach((client) => {
      client.send(id)
    })
    res.send(200)
})

app.get('/api/events/:id', async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  }
  const query = {
    name: 'fetch-event-by-id',
    text: 'SELECT * FROM events WHERE id = $1',
    values: [req.params.id]
  }
  const result = await executeQuery(query);
  if (result.length === 0){
    res.sendStatus(400);
  }
  res.send(result[0]);
})


app.get('/api/events', async (req, res) => {

  const query = {
    name: 'fetch-events',
    text: 'SELECT * FROM events',
  }
  const result = await executeQuery(query);
  res.send(result);
})

app.get('/api/persons/:cardId', async (req, res) => {
  if (!req.params.cardId) {
    res.sendStatus(400);
  }
  const query = {
    name: 'fetch-person-by-card-id',
    text: 'SELECT * FROM persons WHERE card_id = $1',
    values: [req.params.cardId]
  }
  const result = await executeQuery(query);
  if (result.length === 0){
    res.sendStatus(400);
  }
  res.send(result[0]);
})
app.get('*', (req, res) => {
    const htmlString = renderHtmlString();
    res.send(`<!doctype html>\n${htmlString}`);
});

export default app;
