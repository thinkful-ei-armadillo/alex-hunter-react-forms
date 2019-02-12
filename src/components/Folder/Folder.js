import React from 'react';
import { Link } from 'react-router-dom';

function Folder (props) {

  return (
    // <Link to='/' className="folderContainer">{props.name}</Link>
    <a href='/' className="folderContainer">{props.folder.name}</a>

  );
}

Folder.defaultProps = {
  folder: {},
};

export default Folder;
