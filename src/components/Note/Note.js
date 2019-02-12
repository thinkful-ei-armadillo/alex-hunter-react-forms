import React from 'react';

function Note(props) {

  let jsxNotePreview = (
    <div className="note" data-note-id={props.note.id} data-folder-id={props.note.folderId}>
      <h3>{props.note.name}</h3>
      <p>{props.note.modified}</p>
    </div>
  );

  let jsxNoteContent = (
    <p>{props.note.content}</p>
  );


  return (
    <React.Fragment>
      {jsxNotePreview}
      {props.full && jsxNoteContent}
    </React.Fragment>
  );
}

Note.defaultProps = {
  note: {},
  full: false,
};

export default Note;
