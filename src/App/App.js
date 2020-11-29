import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import NotefulErrors from "../NotefulErrors.js";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      name: "",
    },
    newNote: {
      name: {
        touched: false,
        value: "",
      },
      folder_id: {
        touched: false,
        value: "",
      },
      content: {
        touched: false,
        value: "",
      },
    },
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

<<<<<<< Updated upstream
=======
  updateNewFolderName = (name) => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: name,
      },
    });
  };

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    });
  };

  handleAddFolder = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

>>>>>>> Stashed changes
  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
<<<<<<< Updated upstream
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
=======
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
>>>>>>> Stashed changes
      </>
    );
  }

  render() {
<<<<<<< Updated upstream
    return (
      <div className="App">
        <nav className="App_nav">{this.renderNavRoutes()}</nav>
        <header className="App_header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main className="App_main">{this.renderMainRoutes()}</main>
      </div>
=======
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      newFolder: this.state.newFolder,
      updateNewFolderName: this.updateNewFolderName,
      newNote: this.state.newNote,
      handleAddNote: this.handleAddNote,
      updateNewNoteData: this.updateNewNoteData,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <NotefulErrors>
            <nav className="App_nav">{this.renderNavRoutes()}</nav>
            <header className="App_header">
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
            </header>
            <main className="App_main">{this.renderMainRoutes()}</main>
          </NotefulErrors>
        </div>
      </ApiContext.Provider>
>>>>>>> Stashed changes
    );
  }
}

export default App;
