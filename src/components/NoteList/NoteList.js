import React from 'react';
import Note from '../Note/Note';

function NoteList (props) {

  const jsxNotes = props.notes.map((note) => {

    return (
      <li id={note.id} key={note.id}>
        <Note note={note} />
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul>
        {jsxNotes}
      </ul>
      <button>Add Note</button>
    </React.Fragment>
  );
}

NoteList.defaultProps = {
  notes: [],
};

export default NoteList;
