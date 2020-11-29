import React from "react";
import Note from "../Note/Note";
<<<<<<< Updated upstream
//import "./NotePageMain.css";
=======
import "./NotePageMain.css";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import PropTypes from "prop-types";
>>>>>>> Stashed changes

export default function NotePageMain(props) {
  return (
    <section className="NotePageMain">
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className="NotePageMain_content">
        {props.note.content.split(/\n \r|\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}

<<<<<<< Updated upstream
NotePageMain.defaultProps = {
  note: {
    content: "",
  },
=======
NotePageMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
>>>>>>> Stashed changes
};
