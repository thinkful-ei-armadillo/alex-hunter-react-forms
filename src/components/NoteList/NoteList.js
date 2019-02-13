import React from 'react';
import Note from '../Note/Note';
import AppContext from '../../AppContext';

class NoteList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = AppContext;

  getFolderNotes = (notes, folderId) => {
    if (!folderId) {
      return notes;
    } else {
      return this.context.notes.filter(note => note.folderId === folderId);
    }
  }

  jsxNotes = (notes) => {
    return notes.map((note) => {
        return (
            <li key={note.id} id={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
        );
    });
  };

  render() {
    const folderId = this.props.match.params.folderId;
    const { notes = [] } = this.context;
    const notesToShow = this.getFolderNotes(notes, folderId);
    return (
      <>
        <ul>
          {this.jsxNotes(notesToShow)}
        </ul>
        <button>Add Note</button>
      </>
    );
  }
}

export default NoteList;
