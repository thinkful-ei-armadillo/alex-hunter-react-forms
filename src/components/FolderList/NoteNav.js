import React from 'react';
import AppContext from '../../AppContext';
import BackButton from '../BackButton/BackButton';

class NoteNav extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = AppContext;

    getFolderNameFromNoteId = (noteId) => {
        const note = this.context.notes.find((n) => n.id === noteId );
        const folder = this.context.folders.find((f) => f.id === note.folderId) || {};
    
        return folder.name;
    }

    render() {
      return (
        <>
            <p>{this.getFolderNameFromNoteId(this.props.match.params.noteId)}</p>
            <BackButton history={this.props.history}/>
        </>
      );
    }
}

export default NoteNav;
