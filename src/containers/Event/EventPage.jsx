import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import PageWrapper, { ContentContainer} from '../../components/PageWrapper';
import { fetchEvent, fetchPerson } from '../../util/apiEndpoints';

class EventPage extends React.Component {
  constructor() {
      super();
    this.state = {
      event: undefined,
      person: undefined,
      loading: false,
    }
  }

  async componentDidMount() {
      const { match: { params: { eventId }}} = this.props;
    const ws = new WebSocket(`${config.websocketDomain}:${config.websocketPort}`);
    // event emmited when connected
    ws.onopen = function () {
        console.log('websocket is connected ...')
        ws.send('connected')
    }
    // event emmited when receiving message 
    ws.onmessage = async (ev) => {
        if (ev.data !== 'connected'){
            this.setState({loading: true})
            console.log(ev)
            const person = await fetchPerson(ev.data)
            this.setState({loading: false, person,})
            console.log("Ev", ev.data);
        }
    }
    const event = await fetchEvent(eventId);
    this.setState({event})
  }

  render() {
      const { loading, person, event} = this.state;
    if (!event){
        <p>Finner ikke event</p>
    }
    return (
      <PageWrapper>
        <ContentContainer>
          <h1>Velkommen!</h1>
          {loading && <p>Kort skanna. 2sek</p>}
          {person && <p>{`Hei ${person.first_name} ${person.last_name}`}</p>}
          <p>Test</p>
        </ContentContainer>
      </PageWrapper>
    );
  }
}

export default withRouter(EventPage);
