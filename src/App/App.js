import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import ApiContext from "../ApiContext";
import config from "../config";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_endpoint}/notes`),
      fetch(`${config.API_endpoint}/folders`),
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then((error) => Promise.reject(error));
        if (!foldersResponse.ok)
          return foldersResponse.json().then((error) => Promise.reject(error));

        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App_nav">{this.renderNavRoutes()}</nav>
          <header className="App_header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App_main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
