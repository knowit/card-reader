import React from 'react';
import styled from '@emotion/styled';
import PageWrapper, { ContentContainer } from '../../components/PageWrapper';
import { spacing, colors } from '../../util/variables';

const StyledReminderPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: ${spacing.large};
  height: 100vh;
  color: white;
  background-color: ${colors.knowit.blue};

  & h1 {
    font-size: 6rem;
  }
  & h4 {
    font-size: 4rem;
  }
`;

const ReminderPage = () => (
  <StyledReminderPage>
    <h1>Husk å skanne kortet ditt!</h1>
    <h4>Vi prøver ut et nytt system for deltakelse i Knowit-events</h4>
    <h4>Hilsen Sosialkomitéen 😘</h4>
  </StyledReminderPage>
);

export default ReminderPage;
