import React, { Component } from "react";
import config from "../config";
import ApiContext from "../ApiContext";
import "./AddNote.css";

export default class AddNote extends Component {
  static contextType = ApiContext;

  addNote = (note) => {
    fetch(`${config.API_endpoint}/notes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (!response.ok)
          return response.json().then((error) => Promise.reject(error));
        return response.json();
      })
      .then((data) => {
        this.context.addNote(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  renderFoldersList = () => {
    return this.context.folders.map((folder) => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const newNote = {
      name: event.target.name.value,
      content: event.target.content.value,
      folder_id: event.target.folders.value,
      modified: new Date(),
    };
    this.addNote(newNote);
    this.props.history.push("/");
  };

  validateName = () => {
    if (this.context.newNote.name.value.length === 0) {
      return "Name is required";
    }
  };

  validateDescription = () => {
    if (this.context.newNote.content.value.length === 0) {
      return "Description is required";
    }
  };

  render() {
    return (
      <>
        <h2 className="add-note-header">Create a note</h2>

        <form
          className="add-note-form"
          onSubmit={(event) => this.handleFormSubmit(event)}
        >
          <label htmlFor="name">
            Name{" "}
            {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            aria-label="Name"
            onChange={(event) =>
              this.context.updateNewNoteData(
                event.target.name,
                event.target.value
              )
            }
          />
          <label htmlFor="content">
            Content{" "}
            {this.context.newNote.content.touched && (
              <p>{this.validateDescription()}</p>
            )}
          </label>

          <input
            type="text"
            name="content"
            id="content"
            required
            aria-label="Description"
            onChange={(event) =>
              this.context.updateNewNoteData(
                event.target.name,
                event.target.value
              )
            }
          />
          <label htmlFor="folders">Folder</label>
          <select
            name="folders"
            id="folders"
            required
            aria-label="Select a folder"
          >
            {this.renderFoldersList()}
          </select>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}
