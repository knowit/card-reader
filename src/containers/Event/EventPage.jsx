import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import PageWrapper, { ContentContainer } from '../../components/PageWrapper';
import { fetchEvent, fetchPerson, participate } from '../../util/apiEndpoints';
import PersonForm from '../Person/PersonForm';
import Spinner from '../../components/Spinner';

const isMissingPersonData = person =>
  !person ||
  person.company_id === null ||
  person.first_name === null ||
  person.last_name === null;

class EventPage extends React.Component {
  constructor() {
    super();
    this.state = {
      event: undefined,
      person: undefined,
      loading: false,
      missingPersonData: false,
      error: '',
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { eventId },
      },
    } = this.props;
    const event = await fetchEvent(eventId);
    this.setState({ event });
    this.cardListener();
  }

  onAddParticipation = async (personId, person) => {
    console.log('participate');
    const { event } = this.state;
    if (!isMissingPersonData(person)) {
      this.setState({ person: undefined });
      try {
        await participate({
          event_id: event.id,
          person_id: personId,
        });
      } catch (err) {
        this.setState({
          error: 'Du kan bare melde deg på en gang, eller vil du betale mer?!',
        });
      }
    } else {
      try {
        await participate({
          event_id: event.id,
          person_id: personId,
        });
      } catch (err) {
        this.setState({
          error: 'Du kan bare melde deg på en gang, eller vil du betale mer?!',
        });
      }
    }
  };

  cardListener = () => {
    const ws = new WebSocket(
      `${config.websocketDomain}:${config.websocketPort}`,
    );
    ws.onopen = () => {
      ws.send('connected');
    };

    ws.onmessage = async ev => {
      if (ev.data !== 'connected') {
        this.setState({ loading: true });
        const person = await fetchPerson(ev.data);
        if (!person) {
          this.setState({ person: { card_id: ev.data } });
        }

        const missingPersonData = isMissingPersonData(person);
        if (!missingPersonData) {
          this.onAddParticipation(person.id, person);
        }
        setTimeout(() => {
          this.setState({ loading: false, person, missingPersonData });
        }, 1000);
      }
    };
  };

  render() {
    const { loading, person, event, missingPersonData, error } = this.state;
    if (!event) {
      return null;
    }

    return (
      <PageWrapper>
        <ContentContainer>
          <h1>{event.name}</h1>
          {error && <p>{error}</p>}
          {loading && <Spinner text="Kort registrert. Vennligst vent." />}
          {person && <p>{`Hei ${person.first_name} ${person.last_name}`}</p>}
          {missingPersonData && (
            <PersonForm
              onAddParticipation={this.onAddParticipation}
              person={person}
            />
          )}
        </ContentContainer>
      </PageWrapper>
    );
  }
}

export default withRouter(EventPage);
