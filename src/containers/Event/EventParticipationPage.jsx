import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { fetchEvent, fetchPerson, participate } from '../../util/apiEndpoints';
import PersonForm from '../Person/PersonForm';
import Spinner from '../../components/Spinner';
import RegistrationSucess from '../../components/RegistrationSucess';
import ErrorMessage from '../../components/ErrorMessage';
import formatDate from '../../util/formatDate';
import EventParticipantsList from './EventParticipantsList';

const isMissingPersonData = person =>
  !person ||
  person.company_id === null ||
  person.first_name === null ||
  person.last_name === null;

class EventParticipationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      event: undefined,
      person: undefined,
      loading: false,
      success: false,
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
    const missingPersonData = isMissingPersonData(person);
    if (missingPersonData) {
      this.onAddError('Mangler data på deg');
    }
    const { event } = this.state;
    if (!missingPersonData) {
      try {
        await participate({
          event_id: event.id,
          person_id: personId,
        });
        this.setState({
          person: undefined,
          missingPersonData: false,
          success: true,
        });
        setTimeout(() => {
          this.setState({ success: false });
        }, 3000);
      } catch (err) {
        this.setState({ person: undefined, missingPersonData: false });
        console.log(err);
        this.onAddError(
          'Du kan bare melde deg på en gang, eller vil du betale mer?!',
        );
      }
    }
  };

  onAddError = error => {
    this.setState({
      error,
    });

    setTimeout(() => {
      this.setState({ error: '' });
    }, 2000);
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
        try {
          const person = await fetchPerson(ev.data);
          if (!person) {
            this.setState({ person: { card_id: ev.data } });
          }

          const missingPersonData = isMissingPersonData(person);
          if (!missingPersonData) {
            this.onAddParticipation(person.id, person);
          }
          await setTimeout(() => {
            this.setState({ loading: false, person, missingPersonData });
          }, 1000);
        } catch (err) {
          this.setState({
            loading: false,
            person: { card_id: ev.data },
            missingPersonData: true,
          });
        }
      }
    };
  };

  render() {
    const {
      loading,
      person,
      event,
      missingPersonData,
      error,
      success,
    } = this.state;
    if (!event) {
      return null;
    }
    return (
      <Fragment>
        <h1>{event.name}</h1>
        <i>{`Dato: ${formatDate(event.date)}`}</i>
        {person && <p>{`Hei ${person.first_name} ${person.last_name}`}</p>}
        {error && <ErrorMessage text={error} />}
        {success && <RegistrationSucess text="Registrering fullført!" />}
        {loading && <Spinner text="Kort registrert. Vennligst vent." />}
        {missingPersonData && (
          <PersonForm
            onAddParticipation={this.onAddParticipation}
            person={person}
          />
        )}
        <EventParticipantsList eventId={event.id} />
      </Fragment>
    );
  }
}

export default withRouter(EventParticipationPage);
