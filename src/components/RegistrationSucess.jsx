import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import FixedMessage from './FixedMessage';
import { css } from '@emotion/core';
import { colors } from '../util/variables';

const greenStyle = css`
    color: ${colors.knowit.green};
`

const RegistrationSucess = ({ text }) => {
  return (
    <FixedMessage css={greenStyle}>
      <CheckCircle />
      {text && <p>{text}</p>}
    </FixedMessage>
  );
};

RegistrationSucess.propTypes = {
  text: PropTypes.string,
};

export default RegistrationSucess;
