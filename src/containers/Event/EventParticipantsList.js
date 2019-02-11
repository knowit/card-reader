import React from 'react';
import styled from '@emotion/styled';

const StyledRow = styled.tr`
  border: 1px solid black;
`;

const StyledCell = styled.td`
  padding: 1rem;
  border: 1px solid black;
`;

const StyledHeader = styled.th`
  padding: 1rem;
  border: 1px solid black;
`;

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
