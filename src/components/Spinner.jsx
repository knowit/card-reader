
/** @jsx jsx */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { css, jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import FixedMessage from './FixedMessage';
import { colors } from '../util/variables';

const blueStyle = css`
  background-color: ${colors.knowit.blue};
  border-color: ${colors.knowit.blue};
  color: white;

  & svg {
    color: white;
  }
`;
const Spinner = ({ text }) => {
  return (
    <FixedMessage css={blueStyle}>
      <CircularProgress disableShrink />
      {text && <p>{text}</p>}
    </FixedMessage>
  );
};

Spinner.propTypes = {
  text: PropTypes.string,
};

export default Spinner;
