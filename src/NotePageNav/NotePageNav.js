import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";

<<<<<<< Updated upstream
export default function NotePageNav(props) {
  return (
    <div className="NotePageNav">
      <CircleButton
        tag="button"
        role="link"
        onClick={() => props.history.goBack()}
        className="NotePageNav_back-button"
      >
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className="NotePageNav_folder-name">{props.folder.name}</h3>
      )}
    </div>
  );
=======
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
>>>>>>> Stashed changes
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {},
  },
};
