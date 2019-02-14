import React from 'react';
import AppContext from '../../AppContext';
import Note from '../Note/Note';

class NoteFull extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
    }
    static contextType = AppContext;
    
    render() {
        const noteId = this.props.match.params.noteId;
        const { notes = [] } = this.context;
        const note = notes.find(note => note.id === noteId) || {};
        return (
            <>
                <Note id={note.id} name={note.name} modified={note.modified} history={this.props.history}/>
                <p>{note.content}</p>
            </>
        );
    }
}

export default NoteFull;