/** @jsx jsx */

import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import FixedMessage from './FixedMessage';
import { css, jsx } from '@emotion/core';
import { colors } from '../util/variables';

const greenStyle = css`
  background-color: ${colors.knowit.green};
  border-color: ${colors.knowit.green};
  color: white;

  & svg {
    height: 80px;
    width: 80px;
  }
`;

const RegistrationSucess = ({ text }) => {
  return (
    <div css={greenStyle}>
      <FixedMessage css={greenStyle}>
        <CheckCircle />
        {text && <p>{text}</p>}
      </FixedMessage>
    </div>
  );
};

RegistrationSucess.propTypes = {
  text: PropTypes.string,
};

export default RegistrationSucess;
