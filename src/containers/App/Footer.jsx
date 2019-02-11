import React from 'react';
import styled from '@emotion/styled';
import { spacing, colors } from '../../util/variables';

const StyledFooter = styled.footer`
  width: 100%;
  height: 10vh;
  display: flex;
  padding: ${spacing.normal};
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${colors.knowit.red};
  border: 1px solid ${colors.knowit.greyLight};
`;

const Footer = () => {
  return <StyledFooter>With ❤ From Knowit</StyledFooter>;
};

export default Footer;
