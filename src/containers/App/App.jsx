import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Global, css } from '@emotion/core';
import Home from '../Home';
import Navbar from '../Navbar';
import EventPage from '../Event';

const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
  }
`;

const App = () => (
  <Fragment>
    <Navbar />
    <Global styles={globalStyles} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/event/:eventId" component={EventPage} />
      <Route path="/user" component={Home} />
    </Switch>
  </Fragment>
);

export default App;
