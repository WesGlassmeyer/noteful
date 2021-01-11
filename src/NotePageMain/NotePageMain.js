import React from "react";
import Note from "../Note/Note";
//import "./NotePageMain.css";

<<<<<<< Updated upstream
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
=======
export default class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  handleDeleteNote = (noteid) => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const { noteid } = this.props.match.params;
    const note = findNote(notes, noteid) || { content: "" };

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain_content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
>>>>>>> Stashed changes
}

NotePageMain.defaultProps = {
  note: {
    content: "",
  },
};
