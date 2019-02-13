import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';

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
                <div className="note">
                    <h3><Link to={`/note/${note.id}`} >{note.name}</Link></h3>
                    <p>{note.modified}</p>
                    <button className="delete">Delete</button>
                </div>
                <p>{note.description}</p>
            </>
        );
    }
}

export default NoteFull;