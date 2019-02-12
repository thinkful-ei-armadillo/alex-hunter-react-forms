import React from 'react';
import { Link } from 'react-router-dom';

function Folder (props) {

  return (
    <Link to={`/folder/${props.folder.id}`} className="folderContainer">{props.folder.name}</Link>
  );
}

Folder.defaultProps = {
  folder: {},
};

export default Folder;
