import React from 'react';
import config from '../../config';
import PageWrapper from '../../components/PageWrapper';

class Home extends React.Component {

  componentDidMount() {
    const ws = new WebSocket(`${config.websocketDomain}:${config.websocketPort}`);
    // event emmited when connected
    ws.onopen = function () {
        console.log('websocket is connected ...')
        ws.send('connected')
    }
    // event emmited when receiving message 
    ws.onmessage = function (ev) {
        console.log(ev);
    }
  }

  render() {
    return (
      <PageWrapper>
        <h1>Velkommen!</h1>
        <p>Denne siden skal bli brukt til å samle inn hvem som er med på forskjellige events. Gå inn på et event og avvent skanning av kort </p>
      </PageWrapper>
    );
  }
}

export default Home;
