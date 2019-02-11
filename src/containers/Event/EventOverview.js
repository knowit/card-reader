import React from 'react';
import { fetchEvents } from '../../util/apiEndpoints';
import { Link } from 'react-router-dom';


class EventOverview extends React.Component {
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
      <div>
        <h1>
          Alle events
        </h1>
        <ul>
          {events.map(event => {
            return (
              <li key={event.id}>
                <Link to={`/events/${event.id}`}>{event.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

export default EventOverview;