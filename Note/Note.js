import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { format } from "date-fns";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };

  static contextType = ApiContext;

  handleClickDelete = (event) => {
    event.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_endpoint}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          return response.json().then((error) => Promise.reject(error));
        return response.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  render() {
    const { name, id, modified } = this.props;

    return (
      <div className="Note">
        <h2 className="Note_title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note_delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          {" "}
          Remove
        </button>
        <div className="Note_dates">
          <div className="Note_dates-modified">
            Modified <span className="Date">{modified}</span>
          </div>
        </div>
      </div>
    );
  }
}

//<span className="Date">{format(props.modified, "do MMM yyyy")}</span>
