import React from 'react';
import { fetchEventParticipants } from '../../util/apiEndpoints';

class EventParticipantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
    };
  }

  async componentDidMount() {
    const { eventId } = this.props;
    const participants = await fetchEventParticipants(eventId);
    console.log(participants);
    this.setState({ participants });
  }

  render() {
    const { participants } = this.state;
    return (
      <div>
        <h2>Participants</h2>
        <table>
          <tbody>
            {participants.map(person => {
              const { person_id, first_name, last_name, company } = person;
              return (
                <tr key={person_id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{company}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventParticipantsList;
