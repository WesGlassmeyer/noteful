import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
<<<<<<< Updated upstream
=======
    newFolder: {
      hasError: false,
      touched: false,
      name: "",
      errormsg: "",
    },
    newNote: {
      name: {
        touched: false,
        value: "",
      },
      folderid: {
        touched: false,
        value: "",
      },
      content: {
        touched: false,
        value: "",
      },
    },
>>>>>>> Stashed changes
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
        errormsg: "",
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

  handleDeleteNote = (noteid) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteid),
    });
  };

  setNewFolderError = (errormsg) => {
    this.setState({
      newFolder: {
        touched: true,
        name: this.state.newFolder.name,
        hasError: true,
        errormsg: errormsg,
      },
    });
  };

>>>>>>> Stashed changes
  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
<<<<<<< Updated upstream
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
=======
        <Route path="/note/:noteid" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {["/", "/folder/:folderid"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        <Route path="/note/:noteid" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        {["/", "/folder/:folderid"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
>>>>>>> Stashed changes
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
<<<<<<< Updated upstream
=======
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      newFolder: this.state.newFolder,
      updateNewFolderName: this.updateNewFolderName,
      newNote: this.state.newNote,
      addNote: this.handleAddNote,
      updateNewNoteData: this.updateNewNoteData,
      setNewFolderError: this.setNewFolderError,
    };
>>>>>>> Stashed changes
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
    );
  }
}

export default App;
