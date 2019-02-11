import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { fetchEvent, fetchPerson, participate } from '../../util/apiEndpoints';
import PersonForm from '../Person/PersonForm';
import Spinner from '../../components/Spinner';
import RegistrationSucess from '../../components/RegistrationSucess';
import ErrorMessage from '../../components/ErrorMessage';
import formatDate from '../../util/formatDate';

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
          success: `Registrering fullført ${person.first_name} ${person.last_name}! Kos deg i kveld :)`,      
          loading: false,
        });
        setTimeout(() => {
          this.setState({ success: undefined });
        }, 4000);
      } catch (err) {
        this.setState({ person: undefined, missingPersonData: false });
        this.onAddError(
          'Du kan bare melde deg på en gang, eller vil du betale mer?!',
        );
      }
    }
  };

  onAddError = error => {
    this.setState({
      error,
      loading: false,
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
          await setTimeout(async () => {
            try {
            const person = await fetchPerson(ev.data);
            if (!person) {
              this.setState({ person: { card_id: ev.data } });
            }

            const missingPersonData = isMissingPersonData(person);
            if (!missingPersonData) {
              this.onAddParticipation(person.id, person);
            }
            this.setState({ loading: false, person, missingPersonData });
                    } catch (err) {
          this.setState({
            loading: false,
            person: { card_id: ev.data },
            missingPersonData: true,
          });
        }
          }, 1000);
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
        {error && <ErrorMessage text={error} />}
        {success && <RegistrationSucess text={success} />}
        {loading && <Spinner text="Kort registrert. Vennligst vent." />}
        {missingPersonData && (
          <PersonForm
            onAddParticipation={this.onAddParticipation}
            person={person}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(EventParticipationPage);
