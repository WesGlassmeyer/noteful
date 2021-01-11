import React from "react";
import { Link } from "react-router-dom";
//import { format } from "date-fns";
//import "./Note.css";

<<<<<<< Updated upstream
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
export default class Note extends React.Component {
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteid = this.props.id;

    fetch(`${config.API_endpoint}/notes/${noteid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteid);
        this.props.onDeleteNote();
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
>>>>>>> Stashed changes
