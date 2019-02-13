import React from 'react';
import Note from '../Note/Note';
import NotesContext from '../../NotesContext';

function NoteList(props) {
  const jsxNotes = (notes) => {
    return notes.map((note) => {
      return (
        <li id={note.id} key={note.id}>
          <Note note={note} />
        </li>
      );
    });
  };

  return (
    <NotesContext.Consumer>
      {({notes}) => (
        <>
          <ul>
            {jsxNotes(notes)}
          </ul>
          <button>Add Note</button>
        </>
      )}
    </NotesContext.Consumer>
  );
}

NoteList.defaultProps = {
  notes: [],
};

export default NoteList;
