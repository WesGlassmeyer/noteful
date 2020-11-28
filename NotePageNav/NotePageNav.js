import React, { Component } from "react";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";

export default class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav_back-button"
        >
          Go
          <br />
          Back
        </CircleButton>
        {folder && <h3 className="NotePageNav_folder-name">{folder.name}</h3>}
      </div>
    );
  }
}
