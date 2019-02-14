import React from "react";
import { Route, Link } from 'react-router-dom';
import NoteList from './components/Main/NoteList';
import NoteFull from './components/Main/NoteFull';
import FolderList from './components/Nav/FolderList';
import NoteNav from './components/Nav/NoteNav';
import AppContext from './AppContext';
import AddFolder from './components/Main/AddFolder';
import AddNote from './components/Main/AddNote';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [], notes: [], handleDelete: this.handleDelete, addFolder: this.addFolder
    }
  }

  BASE_URL = 'http://localhost:9090';
  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    }
    Promise.all([
      fetch(`${this.BASE_URL}/folders`, options),
      fetch(`${this.BASE_URL}/notes`, options)
    ])
    .then( ([foldersResp, notesResp]) => {
      if (!foldersResp.ok) {
        return foldersResp.json().then(event => Promise.reject(event));
      }
      if (!notesResp.ok) {
        return notesResp.json().then(event => Promise.reject(event));
      }
      return Promise.all([
        foldersResp.json(),
        notesResp.json()
      ])
    })
    .then(([foldersJson, notesJson]) => {
      this.setState({folders: foldersJson, notes: notesJson})
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  handleDelete = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId),
    });
  }

  addFolder = (folder) => {
    const folders = [...this.state.folders, folder]
    this.setState({
      folders
    })
  }

  renderMainComponent = () => {
    return (
      <>
        <Route
          exact path="/"
          component={NoteList}
        />
        <Route
          path="/folder/:folderId"
          component={NoteList}
        />
        <Route
          path="/note/:noteId"
          component={NoteFull}
        />
        <Route
          path="/AddFolder"
          component={AddFolder}
        />
        <Route
          path="/AddNote"
          component={AddNote}
        />
      </>
    );
  }

  renderNavigationComponent = () => {
    return (
      <>
        <Route 
          path="/note/:noteId"
          component={NoteNav}
        />
        <Route 
          path="/folder/:folderId"
          component={FolderList}
        />
        <Route 
          exact path="/"
          component={FolderList}
        />
        <Route
          path="/AddFolder"
          component={NoteNav}
        />
        <Route
          path="/AddNote"
          component={NoteNav}
        />
      </>
    );
  }

  render() {
    return (
      <AppContext.Provider value={ this.state }>
        <header id="SiteTitle" role="banner">
          <Link to='/'>Noteful</Link>
        </header>
        <nav role="navigation">
          {this.renderNavigationComponent()}
        </nav>
        <main role="main">
          {this.renderMainComponent()}
        </main>
      </AppContext.Provider>
    );
  }
}

export default App;
