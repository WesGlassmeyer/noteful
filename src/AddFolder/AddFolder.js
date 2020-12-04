import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import "./AddFolder.css";

export default class AddFolder extends Component {
  static contextType = ApiContext;

  addFolder = (name) => {
    fetch(`${config.API_endpoint}/folders/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok)
          return response.json().then((error) => Promise.reject(error));
        return response.json();
      })
      .then((data) => this.context.addFolder(data))
      .catch((error) => {
        console.error({ error });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    let isValid = this.validateFolderName();
    if (isValid) {
      console.log(isValid);
      this.addFolder(newFolder);
      this.props.history.goBack();
    }
  };

  updateFolderName(event) {
    const newName = event.target.value;
    this.context.updateNewFolderName(newName);
  }

  validateFolderName() {
    if (this.context.newFolder.name.trim().length <= 3) {
      this.context.setNewFolderError("Must be more than 3 characters.");
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        <h2 className="add-folder-header">Create a folder</h2>

        <form
          className="add-folder-form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <label htmlFor="newFolder">
            {" "}
            Name{" "}
            {this.context.newFolder.touched &&
              this.context.newFolder.hasError && (
                <p>{this.context.newFolder.errormsg}</p>
              )}
          </label>
          <input
            type="text"
            name="newFolder"
            id="newFolder"
            aria-required="true"
            aria-label="Name"
            onChange={(event) => this.updateFolderName(event)}
          />
          <button type="submit">Add Folder</button>
        </form>
      </>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
};
