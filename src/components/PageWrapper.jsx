import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import styled from '@emotion/styled';
import { colors } from '../util/variables';
import { css, mediaQueries } from '@emotion/core';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  background-color: ${p => p.backgroundColor || 'white'};
`;
const PageWrapper = ({children, ...rest}) => (
    <StyledPageWrapper {...rest}>{children}</StyledPageWrapper>
);

const PageContainer = styled.div`
  padding: 0 5%;
  background-color: ${p => p.backgroundColor || colors.knowit.greyLightest};
  @media (${mediaQueries.xxlarge}) {
    padding: 0 20%;
  }
  @media (${mediaQueries.medium}) {
    padding: 0;
  }
`;

const ContentContainer = ({ children, ...rest }) => (
  <StyledContentContainer {...rest}>{children}</StyledContentContainer>
);

export {
    ContentContainer,
}


export default Content;
