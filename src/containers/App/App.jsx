import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Global, css } from '@emotion/core';
import Home from '../Home';
import Navbar from '../Navbar';

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
      <Route exact path="/event" component={Home} />
      <Route exact path="/user" component={Home} />
    </Switch>
  </Fragment>
);

export default App;
