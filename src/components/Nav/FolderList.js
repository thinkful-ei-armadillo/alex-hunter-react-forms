import React from 'react';
import Folder from '../Folder/Folder';
import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';

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
        <Link to="/addfolder">
          <button id="AddFolder">Add Folder</button>
        </Link>
      </>
    );
  }
}

// FolderList.defaultProps = {
//   folders: [],
// };

export default FolderList;
