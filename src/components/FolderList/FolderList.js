import React from 'react';
import Folder from '../Folder/Folder';
import AppContext from '../../AppContext';

class FolderList extends React.Component {
  static contextType = AppContext;

  getJsxFolders = (folders) => {
    return folders.map((folder) => {
      return (
        <li key={folder.id}>
          <Folder folder={folder} />
        </li>
      );
    });
  }

  render() {
    const { folders = [] } = this.context;
    return (
      <>
        <ul>
          {this.getJsxFolders(folders)}
        </ul>
        <button id="AddFolder">Add Folder</button>
      </>
    );
  }
}

// FolderList.defaultProps = {
//   folders: [],
// };

export default FolderList;
