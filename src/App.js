import React from "react";
import { Route, Link } from 'react-router-dom';
import FolderList from './components/FolderList/FolderList';
import NoteList from './components/NoteList/NoteList';
import NoteFull from './components/Note/NoteFull';
import NoteNav from './components/FolderList/NoteNav';
import AppContext from './AppContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };


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
      </>
    );
  }

  render() {
    return (
      <AppContext.Provider value={ {folders: this.state.folders, notes: this.state.notes} }>
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
