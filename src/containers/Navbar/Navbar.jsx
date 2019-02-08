import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors } from '../../util/variables';
import NavbarMenu from './NavbarMenu';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  red: {
    backgroundColor: colors.knowit.purpleLight,
  },
};

const Left = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Right = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const Navbar = props => {
  const [isOpen, setOpen] = useState(false);
  const { classes } = props;
  console.log(isOpen);
  return (
    <Fragment>
      <AppBar className={classes.red}>
        <Toolbar>
          <Left>
            <IconButton
              onClick={() => setOpen(!isOpen)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Knowit Sharing is Caring
            </Typography>
          </Left>
          <Right>
            <Button color="inherit">Login (Kommer)</Button>
          </Right>
        </Toolbar>
      </AppBar>
      <NavbarMenu isOpen={isOpen} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
