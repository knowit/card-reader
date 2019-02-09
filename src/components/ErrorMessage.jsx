import React from 'react';
import Error from '@material-ui/icons/Error';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { spacing, colors } from '../util/variables';

const StyledErrorMessage = styled.div`
  top: 1px;
  left: 50%;
  z-index: 1200;
  position: fixed;
  margin-left: -20%;
  width: 20%;
  color: white;
  min-height: 5vh;
  background-color: ${colors.knowit.red};
  border: 1px solid ${colors.knowit.red};
  text-align: center;
  padding: ${spacing.small};
`;

const ErrorMessage = ({ text }) => {
  return (
    <StyledErrorMessage>
      <Error />
      {text && <p>{text}</p>}
    </StyledErrorMessage>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
};

export default ErrorMessage;
