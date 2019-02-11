import React from 'react';
import styled from '@emotion/styled';
import { spacing, colors } from '../util/variables';

const StyledFixedMessage = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -20%;
  width: 20%;
  min-height: 20vh;
  background-color: white;
  text-align: center;
  border: 1px solid ${colors.knowit.greyLight};
  padding: ${spacing.large};
`;

const FixedMessage = ({ children, ...rest }) => {
  return (
    <StyledFixedMessage {...rest}>
       {children}
    </StyledFixedMessage>
  );
};

export default FixedMessage;
