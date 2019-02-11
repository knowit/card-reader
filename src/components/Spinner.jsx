import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import FixedMessage from './FixedMessage';

const Spinner = ({ text }) => {
  return (
    <FixedMessage>
      <CircularProgress disableShrink />
      {text && <p>{text}</p>}
    </FixedMessage>
  );
};

Spinner.propTypes = {
  text: PropTypes.string,
};

export default Spinner;
