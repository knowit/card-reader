import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import PageWrapper, { ContentContainer } from '../../components/PageWrapper';
import { fetchEvents } from '../../util/apiEndpoints';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    const events = await fetchEvents();
    this.setState({ events });
  }

  render() {
    const { events } = this.state;
    return (
      <PageWrapper>
        <ContentContainer>
          <h1>Velkommen!</h1>
          <p>
            Denne siden skal bli brukt til å samle inn hvem som er med på
            forskjellige events. Gå inn på et event og avvent skanning av kort{' '}
          </p>
          <ul>
            {events.map(event => {
              return (
                <li>
                  <Link to={`/events/${event.id}`}>{event.name}</Link>
                </li>
              );
            })}
          </ul>
        </ContentContainer>
      </PageWrapper>
    );
  }
}

export default Home;
