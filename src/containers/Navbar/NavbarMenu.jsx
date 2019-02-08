import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  SwipeableDrawer,
} from '@material-ui/core';
import { People, Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, spacing } from '../../util/variables';

const listStyle = css`
  width: 300px;
`;

const StyledList = styled(List)`
  width: 300px;
  padding-top: ${spacing.large};

  & a,
  & svg {
    color: black;
  }
`;

const NavbarMenu = ({ isOpen, onClose }) => {
  return (
    <SwipeableDrawer
      disableDiscovery
      disableSwipeToOpen
      disableBackdropTransition
      onOpen={() => {}}
      PaperProps={{
        style: {
          // By setting variant="temporary" a borde right is applied. Which is why it setting it to "inherit" removes it
          borderRight: 'inherit',
        },
      }}
      variant={null}
      open={isOpen}
      css={listStyle}
      onClose={onClose}>
      <StyledList>
        <Link to="/">
          <ListItem>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Hjem</ListItemText>
          </ListItem>
        </Link>
        <Link to="/user">
          <ListItem>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText>Brukere</ListItemText>
          </ListItem>
        </Link>
      </StyledList>
    </SwipeableDrawer>
  );
};

NavbarMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NavbarMenu;
