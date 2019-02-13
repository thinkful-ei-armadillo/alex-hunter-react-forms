import React from "react";
import { Route, Link } from 'react-router-dom';
import FolderList from './components/FolderList/FolderList';
import NoteList from './components/NoteList/NoteList';
import Note from './components/Note/Note';
import Store from './dummy-store';
import NotesContext from './NotesContext';

class App extends React.Component {
  state = Store;

  getFolderNotes = (folderId) => {
    return this.state.notes.filter(note => note.folderId === folderId);
  }

  getNoteById = (noteId) => {
    return this.state.notes.find(note => note.id === noteId);
  }

  getFolderNameFromNoteId = (noteId) => {
    const note = this.state.notes.find((n) => n.id === noteId );
    const folder = this.state.folders.find((f) => f.id === note.folderId);

    return folder.name;
  }

  renderMainComponent = () => {
    return (
      <>
        <Route
          exact path="/"
          render={() => {
            return (
              <NotesContext.Provider
                value={{ notes: this.state.notes }}>
                <NoteList />
              </NotesContext.Provider>
            )}}
        />
        <Route
          path="/folder/:folderId"
          render={(props) => {
            return (
              <NotesContext.Provider
                value={{ notes: this.getFolderNotes(props.match.params.folderId) }}>
                <NoteList />
              </NotesContext.Provider>
            );
          }}
        />
        <Route
          path="/note/:noteId"
          render={(props) => {
            return <Note note={this.getNoteById(props.match.params.noteId)} full={true} />
          }}
        />
      </>
    );
  }

  renderNavigationComponent = () => {
    return (
      <>
        <Route path="/note/:noteId" render={(props) => {
          return (
            <>
              <p>{this.getFolderNameFromNoteId(props.match.params.noteId)}</p>
              <button onClick={() => props.history.goBack()}>Go Back</button>
            </>
          )
        }} />
        <Route path="/folder/:folderId" render={() => {
          return <FolderList folders={this.state.folders} />
        }} />
        <Route exact path="/" render={(props) => {
          return <FolderList folders={this.state.folders} />
        }} />
      </>
    );
  }

  render() {
    return (
      <React.Fragment>
        <header id="SiteTitle" role="banner">
          <Link to='/'>Noteful</Link>
        </header>
        <nav role="navigation">
          {this.renderNavigationComponent()}
        </nav>
        <main role="main">
          {this.renderMainComponent()}
        </main>

      </React.Fragment>
    );
  }
}

export default App;
