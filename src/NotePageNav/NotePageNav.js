import React from "react";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
<<<<<<< Updated upstream
=======
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";
import PropTypes from "prop-types";
>>>>>>> Stashed changes

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
}

<<<<<<< Updated upstream
NotePageNav.defaultProps = {
  history: {
    goBack: () => {},
  },
=======
NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
>>>>>>> Stashed changes
};
