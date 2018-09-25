import React from "react";
import { connect } from "react-redux";

import { addNewNote, updateNote } from "../store/actions";

import NoteForm from "../components/NotesForm/NotesForm";

const blankFormValues = {
  title: "",
  textBody: ""
};

class NoteFormView extends React.Component {
  state = {
    note: {
      title: "",
      textBody: ""
    },
    isUpdating: false
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.noteToUpdate) {
      this.setState({ isUpdating: true, note: this.props.noteToUpdate });
    }
  }

  handleChange = event => {
    this.setState({
      note: {
        ...this.state.note,
        [event.target.name]: event.target.value
      }
    });
  };

  handleAddNewNote = event => {
    event.preventDefault();
    this.props.addNewNote(this.state.note);
    this.props.history.push("/notes");
  };

  handleUpdateNote = () => {
    this.props.updateNote(this.state.note);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <NoteForm
        {...this.props}
        note={this.state.note}
        handleAddNewNote={this.handleAddNewNote}
        handleChange={this.handleChange}
        handleUpdateNote={this.handleUpdateNote}
        isUpdating={this.state.isUpdating}
      /> // spread in props --> same as "match={props.match} location={props.location} history={props.history}"
    );
  }
}

const mapStateToProps = state => ({
  noteToUpdate: state.noteToUpdate
});

export default connect(
  mapStateToProps,
  { addNewNote, updateNote }
)(NoteFormView);
