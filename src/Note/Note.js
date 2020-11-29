import React from "react";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
//import { format } from "date-fns";
//import "./Note.css";

export default function Note(props) {
  return (
    <div className="Note">
      <h2 className="Note_title">
        <Link to={`/note/${props.id}`}>{props.name}</Link>
      </h2>
      <button className="Note_delete" type="button">
        {" "}
        remove
      </button>
      <div className="Note_dates">
        <div className="Note_dates-modified">
          Modified <span className="Date">{props.modified}</span>
=======
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";
import Moment from "moment";
import PropTypes from "prop-types";

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
        if (!response.ok) {
          return response.json().then((error) => Promise.reject(error));
        } else {
          return response.json();
        }
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
            Modified{" "}
            <span className="Date">
              {Moment(modified).format("MMM Do YYYY")}
            </span>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}

<<<<<<< Updated upstream
//<span className="Date">{format(props.modified, "do MMM yyyy")}</span>
=======
Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
};
>>>>>>> Stashed changes
