import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';
import withRoot from './withRoot';

// ui components
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from 'material-ui/Dialog';
import Tooltip from 'material-ui/Tooltip';

// icons / typography
import Typography from 'material-ui/Typography';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import DeleteIcon from 'material-ui-icons/Delete';

import { appStyles } from './App.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flex: 1,
  },
  dialog: {
    minWidth: "30%",
    minHeight: "20%",
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Array().fill(null),
      addNoteOpen: false,
      selectedNoteId: 0,
      newNote: ""
    }
    this.handleNewNoteChange = this.handleNewNoteChange.bind(this);
  }

  handleNewNote = () => {
    this.setState({
      addNoteOpen: true,
    });
  };

  handleCancelNote = () => {
    this.setState({
      addNoteOpen: false,
    });
  };

  handleSaveNote = () => {
    const notes = this.state.notes.slice();
    const newNoteId = notes.length;
    notes.push({ text: this.state.newNote, id: newNoteId });
    this.setState({
      notes: notes,
      addNoteOpen: false,
      newNote: "",
      selectedNoteId: newNoteId,
    });
  };

  handleNoteSelected(noteId) {
    console.log('note id: ' + noteId + ' selected');
  };

  handleNewNoteChange(event) {
    this.setState({ newNote: event.target.value });
  }

  handleDeleteNote(noteId) {
    console.log('delete note');
  }

  render() {
    const { classes } = this.props;
    const { state } = this.state;

    const noteItems = this.state.notes.map((note) =>
      <ListItem button key={note.id} onClick={this.handleNoteSelected(note.id)}>
        <ListItemText primary={note.text.length > 15 ? note.text.substring(0,15) + "..." : note.text} />
        <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={this.handleDeleteNote(note.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
      </ListItem>
    );

    return (
      <div className={classes.root}>
        <Dialog disableBackdropClick
          disableEscapeKeyDown
          maxWidth="md"
          fullWidth open={this.state.addNoteOpen}>
          <DialogTitle>Add Note</DialogTitle>
          <DialogContent>
            <div className="form-group">
              <textarea required="required" value={this.state.newNote} onChange={this.handleNewNoteChange}></textarea>
              <label className="control-label" htmlFor="textarea">Note</label><i className="bar"></i>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="default" onClick={this.handleCancelNote}>
              CANCEL
            </Button>
            <Button color="primary" onClick={this.handleSaveNote}>
              SAVE NOTE
            </Button>
          </DialogActions>
        </Dialog>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Notes
          </Typography>
          <Tooltip title="Add Note" placement="left">
          <IconButton color="inherit" aria-label="Add" onClick={this.handleNewNote}>
              <AddCircleIcon />
            </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper, }}>
          <div className={classes.toolbar} />
          <List>
            {noteItems}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{this.state.notes && this.state.notes.length > 0 ? this.state.notes[this.state.selectedNoteId].text : ""}</Typography>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
