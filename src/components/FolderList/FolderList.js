import React from 'react';
import Folder from '../Folder/Folder';

function FolderList (props) {

  const jsxFolders = props.folders.map((folder) => {

    return (
      <li key={folder.id}>
        <Folder folder={folder} />
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul>
        {jsxFolders}
      </ul>
      <button id="AddFolder">Add Folder</button>
    </React.Fragment>
  );
}

// FolderList.defaultProps = {
//   folders: [],
// };

export default FolderList;
