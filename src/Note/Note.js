import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "moment";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";

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
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
