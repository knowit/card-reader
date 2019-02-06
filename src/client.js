import React from 'react';
import App from './containers/App/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { render } from 'react-dom';
const renderApp = () =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );

renderApp();
if (module.hot) {
  module.hot.accept();
  renderApp();
}
