/** @jsx jsx */
import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Global, css, jsx } from '@emotion/core';
import Home from '../Home';
import Navbar from '../Navbar';
import EventPage from '../Event';
import Footer from './Footer';
import ReminderPage from '../Reminder';

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
      <Route path="/events" component={EventPage} />
      <Route path="/users" component={Home} />
      <Route path="/reminder" component={ReminderPage} />
    </Switch>
    <Footer />
  </Fragment>
);

export default App;
