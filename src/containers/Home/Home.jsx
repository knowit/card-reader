import React from 'react';
import PageWrapper, { ContentContainer } from '../../components/PageWrapper';
import EventOverview from '../Event/EventOverview';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PageWrapper>
        <ContentContainer>
          <h1>Velkommen!</h1>
          <p>
            Denne siden skal bli brukt til å samle inn hvem som er med på
            forskjellige events. Gå inn på et event og avvent skanning av kort{' '}
          </p>
          <EventOverview />
        </ContentContainer>
      </PageWrapper>
    );
  }
}

export default Home;
