import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import "./App.css";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import NotefulErrors from "../NotefulErrors";
import ApiContext from "../ApiContext";
import config from "../config";

class App extends Component {
  state = {
    notes: [],
    folders: [],
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
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_endpoint}/notes`),
      fetch(`${config.API_endpoint}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

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

  renderNavRoutes() {
    return (
      <>
        <Route path="/note/:noteid" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {["/", "/folder/:folderid"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        <Route path="/note/:noteid" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        {["/", "/folder/:folderid"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
      </>
    );
  }

  render() {
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
    );
  }
}

export default App;
