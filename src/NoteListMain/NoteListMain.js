import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import PropTypes from "prop-types";

export default class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderid } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderid);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.onDeleteNote}
              />
            </li>
          ))}
        </ul>
        <div className="NoteListMain_button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain_add-note-button"
          >
            <br></br>
            Add
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object,
};
