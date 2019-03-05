import React from 'react';
import {
  StyledCell,
  StyledHeader,
  StyledRow,
} from '../../components/TableStyles';

const EventStatistics = ({ attendanceByCompany, totalAttendees }) => (
  <div>
    <table>
      <thead>
        <StyledRow>
          <StyledHeader>Avdeling</StyledHeader>
          <StyledHeader>Antall</StyledHeader>
        </StyledRow>
      </thead>
      <tbody>
        {attendanceByCompany.map(company => {
          const { company_id, company_name, attendees } = company;
          return (
            <StyledRow key={company_id}>
              <StyledCell>{company_name}</StyledCell>
              <StyledCell>{attendees}</StyledCell>
            </StyledRow>
          );
        })}
        <StyledRow>
          <StyledCell>Total</StyledCell>
          <StyledCell>{totalAttendees}</StyledCell>
        </StyledRow>
      </tbody>
    </table>
  </div>
);

export default EventStatistics;
