import React from 'react';
import EventOverview from './EventOverview';
import Button from '@material-ui/core/Button/';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import AddEvent from './AddEvent';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  addIcon: {
    marginRight: theme.spacing.unit,
  },
});

class EventAdmin extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    }
  }

  handleModalOpen = () => {
    console.log("Open modal");
    console.log(this.state);
    this.setState({ isModalOpen: true });
  };

  render() {
    const { classes } = this.props;
    const { isModalOpen } = this.state;
    return (
      <div>
        <Button
          variant="contained"
          className={classes.fab}
          onClick={this.handleModalOpen}
        >
          <AddIcon className={classes.addIcon} />
          Nytt event
        </Button>

        <Modal style={{alignItems:'center',justifyContent:'center'}} open={isModalOpen} >
          <AddEvent />
        </Modal>
        <EventOverview />
      </div>
    )
  }
}

export default withStyles(styles)(EventAdmin);