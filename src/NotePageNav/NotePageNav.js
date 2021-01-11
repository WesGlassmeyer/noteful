import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";
import PropTypes from "prop-types";

export default class NotePageNav extends React.Component {
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
    const { noteid } = this.props.match.params;
    const note = findNote(notes, noteid) || {};
    const folder = findFolder(folders, note.folderid);
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

NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
