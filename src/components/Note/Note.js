import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../../NoteContext';

function Note() {

  const jsxNotePreview = (note, full) => {
    return (
      <>
        <div className="note" data-note-id={note.id} data-folder-id={note.folderId}>
          <h3><Link to={`/note/${note.id}`} >{note.name}</Link></h3>
          <p>{note.modified}</p>
          <button class="delete">Delete</button>
        </div>
        {full && <p>{note.content}</p>}
      </>
    )};



  return (
    <NoteContext.Consumer>
      {({note, full}) => (
        <>
          {jsxNotePreview(note, full)}
        </>
      )}
    </NoteContext.Consumer>
  );
}

Note.defaultProps = {
  note: {},
  full: false,
};

export default Note;
