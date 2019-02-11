/** @jsx jsx */

import React from 'react';
import Error from '@material-ui/icons/Error';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { spacing, colors } from '../util/variables';
import FixedMessage from './FixedMessage';
const redStyle = css`
  background-color: ${colors.knowit.red};
  border-color: ${colors.knowit.red};
  color: white;

  & svg {
    height: 80px;
    width: 80px;
  }
`;
const ErrorMessage = ({ text }) => {
  return (
    <FixedMessage css={redStyle}>
      <Error />
      {text && <p>{text}</p>}
    </FixedMessage>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
};

export default ErrorMessage;
