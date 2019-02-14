import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

class Note extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string
  }

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
        <p>{format(this.props.modified, 'Do MMM YYYY')}</p>
        <button className="delete" onClick={() => this.handleDeleteNote()}>Delete</button>
      </div>
    );
  }
}

export default Note;
