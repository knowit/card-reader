import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { spacing } from '../util/variables';

const StyledSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -20%;
  width: 20%;
  min-height: 20vh;
  background-color: white;
  text-align: center;
  padding: ${spacing.large};
`;

const Spinner = ({ text }) => {
  return (
    <StyledSpinner>
      <CircularProgress disableShrink />
      {text && <p>{text}</p>}
    </StyledSpinner>
  );
};

Spinner.propTypes = {
  text: PropTypes.string,
};

export default Spinner;
