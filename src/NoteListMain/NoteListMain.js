import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
<<<<<<< Updated upstream
//import "./NoteListMain.css";
=======
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import PropTypes from "prop-types";
>>>>>>> Stashed changes

export default function NoteListMain(props) {
  return (
    <section className="NoteListMain">
      <ul>
        {props.notes.map((note) => (
          <li key={note.id}>
            <Note name={note.name} modified={note.modified} />
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
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  );
}

<<<<<<< Updated upstream
NoteListMain.defaultProps = {
  notes: [],
=======
NoteListMain.propTypes = {
  match: PropTypes.object,
>>>>>>> Stashed changes
};
