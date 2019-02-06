import App from '../containers/App/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import WebSocket from 'ws';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import Html from './Html';

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
const wss = new WebSocketServer({port: 40510});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    ws.send(message)
  })
});

app.get('/card_recorder', (req, res) => {
    const id = req.query.id;
    if (!id) {
      res.send(400);
    }
    wss.clients.forEach((client) => {
      client.send(id)
    })
    res.send(200)
})

app.put('/person', (req, res) => {

})

app.get('/person', (req, res) => {

})

app.get('*', (req, res) => {
    const htmlString = renderHtmlString();
    res.send(`<!doctype html>\n${htmlString}`);
});

export default app;
