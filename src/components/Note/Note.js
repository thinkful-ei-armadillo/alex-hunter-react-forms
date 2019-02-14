import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';

class Note extends React.Component {
  static contextType = AppContext;

  handleDeleteNote = () => {
    fetch(`http://localhost:9090/notes/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Something went wrong!')
        }
        return resp.json();
      })
      .then(() => {
        if (this.props.history) { this.props.history.push('/') };
        this.context.handleDelete(this.props.id);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    return (
      <div className="note">
        <h3><Link to={`/note/${this.props.id}`} >{this.props.name}</Link></h3>
        <p>{this.props.modified}</p>
        <button className="delete" onClick={() => this.handleDeleteNote()}>Delete</button>
      </div>
    );
  }
}

export default Note;
