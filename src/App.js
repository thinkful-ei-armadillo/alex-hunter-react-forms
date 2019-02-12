import React from "react";
import { Route } from 'react-router-dom';
import FolderList from './components/FolderList/FolderList';
import NoteList from './components/NoteList/NoteList';
import Note from './components/Note/Note';
import Sidebar from './components/Sidebar/Sidebar';
import Store from './dummy-store';

class App extends React.Component {
  state = Store;

  getFolderNotes = (folderId) => {
    return this.state.notes.filter(note => note.folderId === folderId);
  }

  getNoteById = (noteId) => {
    return this.state.notes.find(note => note.id === noteId);
  }

  renderMainComponent = () => {
    return (
      <>
        <Route 
          exact path="/" 
          render={() => <NoteList notes={this.state.notes} />}
        />
        <Route 
          path="/folder/:folderId" 
          render={(props) => {
            return <NoteList notes={this.getFolderNotes(props.match.params.folderId)} />
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

  render() {
    return (
      <React.Fragment>
        <header role="banner">

        </header>
        <main role="main">
          {this.renderMainComponent()}
        </main>
        <nav role="navigation">

        </nav>
      </React.Fragment>
    );
  }
}

//routes we have:
  //Main section
    // '/' = all notes
    // '/folder/:folder-id' = only notes in that folder, so we apply a filter
    // '/note/:note-id' = only that specific note
  //Sidebar section
    // '/' = all folders and add folder button
    // '/note/:note-id' = go back button and folder name

export default App;
