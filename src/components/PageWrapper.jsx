import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import styled from '@emotion/styled';
import { colors, mediaQueries, spacing } from '../util/variables';
import { css } from '@emotion/core';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  background-color: ${p => p.backgroundColor || colors.greyLight};
`;
const PageWrapper = ({ children, ...rest }) => (
  <StyledPageWrapper {...rest}>{children}</StyledPageWrapper>
);

const StyledContentContainer = styled.div`
  padding: 0 5%;
  margin-top: 5rem;
  @media (${mediaQueries.xxlarge}) {
    padding: 0 10%;
  }
  @media (${mediaQueries.medium}) {
    padding: 0;
  }
`;

const StyledInnerContent = styled.div`
  background-color: white;
  padding: ${spacing.normal};
  border: 1px solid ${colors.knowit.greyLight};
`;

const ContentContainer = ({ children, ...rest }) => (
  <StyledContentContainer {...rest}>
    <StyledInnerContent>{children}</StyledInnerContent>
  </StyledContentContainer>
);

export { ContentContainer };

export default PageWrapper;
