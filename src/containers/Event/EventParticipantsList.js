import React from 'react';
import { StyledCell, StyledHeader, StyledRow } from '../../components/TableStyles';


const EventParticipantsList = ({ participants }) => (
  <div>
    <h2>Deltakere</h2>
    <table>
      <thead>
        <StyledRow>
          <StyledHeader>Fornavn</StyledHeader>
          <StyledHeader>Etternavn</StyledHeader>
          <StyledHeader>Firma</StyledHeader>
        </StyledRow>
      </thead>
      <tbody>
        {participants.map(person => {
          const { person_id, first_name, last_name, company } = person;
          return (
            <StyledRow key={person_id}>
              <StyledCell>{first_name}</StyledCell>
              <StyledCell>{last_name}</StyledCell>
              <StyledCell>{company}</StyledCell>
            </StyledRow>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default EventParticipantsList;
