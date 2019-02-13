import React from 'react';
import { Link } from 'react-router-dom';

function Note(props) {
  return (
    <div className="note">
      <h3><Link to={`/note/${props.id}`} >{props.name}</Link></h3>
      <p>{props.modified}</p>
      <button className="delete">Delete</button>
    </div>
  );
}

export default Note;
